import NextHead from 'next/head'
import {
  Box,
  Container,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { Fragment, useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import useSWR from 'swr'

import { Icon, LearningTag, HeaderEditor, Hero, useToast } from '@components'
import { CMSViewJSON } from '@components/cms'
import { CMSBlock, CMSBlockAdderButtons } from '@components/cms/blocks'
import { fetcher, slugify, initBlock } from '@utils'

/**-----------------------------------------------------------------------------
 * CMS Lesson editor, with UI and logic
 -----------------------------------------------------------------------------*/
export function LessonEditor({ router, lessonId }) {
  const { data: initialData, error } = useSWR(
    `/api/cms/lessons/${lessonId}`,
    fetcher
  )
  const toast = useToast({ duration: 1000 })

  /**
   * State to change UI view mode.
   * Might not work well yet with RHF.
   */
  const [viewMode, setViewMode] = useState('result')

  /**
   * Data from API. Used once to populate the initial state data.
   * But need to wait until lesson data is ready to be used in UI.
   */
  useEffect(() => {
    if (initialData) {
      // setValue('lesson', initialData)
      reset({ ...initialData })
    }
  }, [initialData])

  /**
   * RHF (React Hook Form)
   */
  const {
    control,
    errors,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm({
    mode: 'onSubmit',
  })

  const handleSave = (data) => {
    toast({ status: 'success', title: 'Saved lesson data!' })
    console.info(
      JSON.stringify({ type: 'SAVE_LESSON', payload: data }, null, 2)
    )
  }

  const handleDelete = () => {
    toast({ status: 'error', title: 'Deleted lesson data!' })
  }

  const handleReset = () => {
    toast({ title: 'Resetted lesson data!', status: 'warning' })
    reset({ ...initialData })
  }

  const handleBack = () => {
    router.push('/cms/lessons')
  }

  const togglePublishLesson = (event) => {
    try {
      if (event.target.checked) {
        // Change lesson.is_published here
        toast({ title: 'Published lesson', status: 'success' })
      } else {
        toast({ title: 'Unpublished lesson', status: 'warning' })
      }
    } catch (error) {
      toast({
        status: 'error',
        title: 'Failed to toggle lesson published status',
      })
    }
  }

  const handleGenerateSlug = () => {
    try {
      const values = getValues()
      const generatedSlug = slugify(values.title)
      if (generatedSlug) {
        setValue('slug', generatedSlug)
        toast({
          title: 'Generated slug!',
          description: generatedSlug,
          status: 'info',
        })
      }
    } catch (error) {
      toast({ title: 'Failed to generate slug!', status: 'error' })
    }
  }

  /**
   * UI for the whole lesson.
   * Handlers should be grouped into actions later.
   */
  if (error) {
    return <p>Lesson by id #{lessonId} not found.</p>
  }
  if (!initialData) {
    return <p>Loading lesson...</p>
  }
  return (
    <>
      {getValues() && (
        <>
          <NextHead>
            <title>Lesson #{initialData.id} · Catamyst</title>
          </NextHead>
          <HeaderEditor
            name="lesson"
            item={initialData}
            register={register}
            actions={{
              togglePublishLesson,
              handleBack,
              handleDelete,
              handleReset,
              handleSave,
              handleSubmit,
              handleViewResult: () => setViewMode('result'),
              handleViewJSON: () => setViewMode('json'),
            }}
          />
          {viewMode === 'result' && (
            <CMSViewResultLesson
              control={control}
              register={register}
              actions={{
                handleGenerateSlug,
              }}
              initialData={initialData}
            />
          )}
          {viewMode === 'json' && <CMSViewJSON codeString={getValues()} />}
        </>
      )}
    </>
  )
}

/**-----------------------------------------------------------------------------
 * The actual lesson content that utilize RHF field array helpers.
 -----------------------------------------------------------------------------*/
function CMSViewResultLesson({ initialData, control, register, actions }) {
  const toast = useToast({ duration: 1000 })

  /**
   * RHF (React Hook Form) field array with helpers.
   * Get control from instantiated useForm in parent component.
   */
  const { append, fields, insert, move, prepend, remove } = useFieldArray({
    control,
    name: 'blocks',
  })

  /**
   * Toggle block by index to change is_published true or false.
   */
  const togglePublishBlock = (event) => {
    try {
      if (event.target.checked) {
        // Change block.is_published here
        toast({ title: 'Published block', status: 'success' })
      } else {
        toast({ title: 'Unpublished block', status: 'warning' })
      }
    } catch (error) {
      toast({
        status: 'error',
        title: 'Failed to toggle block published status',
      })
    }
  }

  /**
   * Add block to the first index.
   */
  const prependBlock = (index, type) => {
    try {
      prepend(initBlock(type))
      toast({ title: 'Prepended block above' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to prepend block above' })
    }
  }

  /**
   * Add block to the selected index.
   */
  const insertBlock = (index, type) => {
    try {
      insert(index + 1, initBlock(type))
      toast({ title: 'Inserted block here' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to insert block here' })
    }
  }

  /**
   * Add block to the last index.
   */
  const appendBlock = (index, type) => {
    try {
      append(initBlock(type))
      toast({ title: 'Appended block below' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to append block below' })
    }
  }

  /**
   * Move block to previous index or next index.
   */
  const moveBlock = (index, direction) => {
    try {
      if (direction === 'up' && index !== 0) {
        move(index, index - 1)
        toast({ title: `Moved block ${direction}` })
      }
      if (direction === 'down' && index !== fields.length) {
        move(index, index + 1)
        toast({ title: `Moved block ${direction}` })
      }
    } catch (error) {
      toast({ status: 'error', title: `Failed to move block ${direction}` })
    }
  }

  /**
   * Remove block by index that passed down into each CMS Block.
   */
  const removeBlock = (index) => {
    try {
      remove(index)
      toast({ title: 'Removed block', status: 'error' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to remove block' })
    }
  }

  /**
   * Save block by index that passed down into each CMS Block.
   */
  const saveBlock = (index) => {
    try {
      toast({ title: 'Saved block' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to save block' })
    }
  }

  /**
   * UI for lesson meta and blocks.
   */
  return (
    <>
      <CMSLessonHero
        register={register}
        initialData={initialData}
        actions={actions}
      />

      <Container width="100%" maxW="1500px" pt={5} px={0}>
        <Stack id="form-lesson-blocks" align="center" spacing={5}>
          {/* Actions alias prependBlock/appendBlock/insertBlock as addBlock */}
          <CMSBlockAdderButtons
            name="prepend"
            index={0}
            actions={{ addBlock: prependBlock }}
          />
          {fields.map((block, index) => {
            return (
              <Fragment key={block.id}>
                {/* Each CMSBlock type contains CMSBlockModifierButtons */}
                <CMSBlock
                  index={index}
                  block={block}
                  actions={{
                    register,
                    togglePublishBlock,
                    moveBlock,
                    removeBlock,
                    saveBlock,
                  }}
                />
                <CMSBlockAdderButtons
                  name="insert"
                  index={index}
                  actions={{ addBlock: insertBlock }}
                />
              </Fragment>
            )
          })}
          <CMSBlockAdderButtons
            name="append"
            index={fields.length}
            actions={{ addBlock: appendBlock }}
          />
        </Stack>
      </Container>
    </>
  )
}

/**-----------------------------------------------------------------------------
 * UI for lesson meta only, placed inside hero.
 * Contains slug, title, category, level.
 -----------------------------------------------------------------------------*/
function CMSLessonHero({ register, initialData, actions }) {
  return (
    <Hero>
      <Box align="center" pb={5}>
        <Stack maxW={760}>
          <InputGroup size="sm" variant="unstyled">
            <InputLeftAddon
              opacity={0.5}
              children={`catamyst.com/learn/track/topic/`}
            />
            <Input
              ref={register}
              name="slug"
              placeholder="lesson-slug"
              isRequired
            />
            <Tooltip label="Generate slug" fontSize="xs">
              <InputRightAddon
                as={IconButton}
                px={2}
                size="xs"
                aria-label="Generate slug"
                icon={<Icon name="generate" />}
                onClick={actions.handleGenerateSlug}
              />
            </Tooltip>
          </InputGroup>

          <Input
            ref={register}
            name="title"
            size="lg"
            fontFamily="heading"
            fontWeight="700"
            fontSize="3xl"
            textAlign="center"
            p={3}
            variant="unstyled"
            placeholder="Lesson Title"
            isRequired
          />

          <RadioGroup colorScheme="teal">
            <Stack direction="row">
              <Text fontWeight="700">Category:</Text>
              <Radio
                ref={register}
                name="category"
                value="Fundamental"
                defaultChecked={initialData.category === 'Fundamental'}
              >
                <LearningTag category="Fundamental" />
              </Radio>
              <Radio
                ref={register}
                name="category"
                value="Specific"
                defaultChecked={initialData.category === 'Specific'}
              >
                <LearningTag category="Specific" />
              </Radio>
              <Radio
                ref={register}
                name="category"
                value="Project"
                defaultChecked={initialData.category === 'Project'}
              >
                <LearningTag category="Project" />
              </Radio>
            </Stack>
          </RadioGroup>

          <RadioGroup colorScheme="teal">
            <Stack direction="row">
              <Text fontWeight="700">Level:</Text>
              <Radio
                ref={register}
                name="level"
                value="Newbie"
                defaultChecked={initialData.level === 'Newbie'}
              >
                Newbie
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Beginner"
                defaultChecked={initialData.level === 'Beginner'}
              >
                Beginner
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Intermediate"
                defaultChecked={initialData.level === 'Intermediate'}
              >
                Intermediate
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Advanced"
                defaultChecked={initialData.level === 'Advanced'}
              >
                Advanced
              </Radio>
            </Stack>
          </RadioGroup>
        </Stack>
      </Box>
    </Hero>
  )
}
