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

import { Icon, LearningTag, HeaderEditor, Hero, useToast } from '@components'
import { CMSViewJSON } from '@components/cms'
import { CMSBlock, CMSBlockAdderButtons } from '@components/cms/blocks'
import { slugify, initBlock } from '@utils'
import { useRedirectHome, useLessonById } from '@hooks'

/**-----------------------------------------------------------------------------
 * CMS Lesson editor, with UI and logic
 -----------------------------------------------------------------------------*/
export function LessonEditor({ lessonId }) {
  const globalState = useRedirectHome()
  const { data: data, isLoading, isError } = useLessonById(lessonId)
  const toast = useToast()
  const [viewMode, setViewMode] = useState('result')

  /**
   * All local state change is handled by RHF (React Hook Form).
   * API call is only used when necessary via handle functions.
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

  useEffect(() => {
    if (!isLoading && data) {
      reset({ ...data.lesson })
    }
  }, [isLoading, data])

  const handleSave = (localData) => {
    // PATCH /api/lessons/id/{lessonId}
    toast({ status: 'success', title: 'Saved lesson data!' })
    console.info(JSON.stringify(localData, null, 2))
  }

  const handleDelete = () => {
    // DELETE /api/lessons/id/{lessonId}
    toast({ status: 'error', title: 'Deleted lesson data!' })
  }

  const handleReset = () => {
    // No request, just local change.
    toast({ title: 'Resetted lesson data!', status: 'warning' })
    reset({ ...data })
  }

  const handleBack = () => {
    globalState.router.push('/cms/lessons')
  }

  const handleTogglePublishLesson = (event) => {
    // No request, just local change.
    try {
      if (event.target.checked) {
        // lesson.is_published = true
        toast({ title: 'Published lesson', status: 'success' })
      } else {
        // lesson.is_published = false
        toast({ title: 'Unpublished lesson', status: 'warning' })
      }
    } catch (error) {
      toast({
        title: 'Failed to toggle lesson published status!',
        status: 'error',
      })
    }
  }

  const handleGenerateSlug = () => {
    // No request, just local change.
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

  return (
    <>
      {isError && (
        <>
          <Text>Failed to get lesson with id #{lessonId}</Text>
        </>
      )}
      {isLoading && (
        <>
          <Text>Loading lesson with id #{lessonId}...</Text>
        </>
      )}
      {!isLoading && !data && (
        <>
          <Text>Sorry, lesson with id #{lessonId} is not found.</Text>
        </>
      )}

      {!isLoading && data && getValues() && (
        <>
          <NextHead>
            <title>Lesson #{data.lesson.id} · Catamyst</title>
          </NextHead>

          <HeaderEditor
            name="lesson"
            item={data}
            register={register}
            actions={{
              handleTogglePublishLesson,
              handleBack,
              handleDelete,
              handleReset,
              handleSave,
              handleSubmit,
              handleViewResult: () => setViewMode('result'),
              handleViewJSON: () => setViewMode('json'),
            }}
          />

          {viewMode === 'json' && (
            <CMSViewJSON name="Lesson" codeString={getValues()} />
          )}

          {viewMode === 'result' && (
            <CMSViewResultLesson
              control={control}
              register={register}
              actions={{
                handleGenerateSlug,
              }}
              data={data}
            />
          )}
        </>
      )}
    </>
  )
}

/**-----------------------------------------------------------------------------
 * The actual lesson content that utilize RHF field array helpers.
 -----------------------------------------------------------------------------*/
function CMSViewResultLesson({ data, control, register, actions }) {
  const toast = useToast()

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
        // Change block.is_published = true inside RHF field array
        toast({ title: 'Published block', status: 'success' })
      } else {
        // Change block.is_published = false inside RHF field array
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
      if (direction === 'down' && index !== fields?.length) {
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
      <CMSLessonHero register={register} data={data} actions={actions} />

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
                {/* This is the important core of the lesson editor */}
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
            index={fields?.length}
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
function CMSLessonHero({ register, data, actions }) {
  return (
    <Hero>
      <Box align="center" pb={5}>
        <Stack maxW={760}>
          <InputGroup size="sm" variant="unstyled">
            {/* track/topic/ because lesson can be used anywhere */}
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
                defaultChecked={data.lesson.category === 'Fundamental'}
              >
                <LearningTag category="Fundamental" />
              </Radio>
              <Radio
                ref={register}
                name="category"
                value="Specific"
                defaultChecked={data.lesson.category === 'Specific'}
              >
                <LearningTag category="Specific" />
              </Radio>
              <Radio
                ref={register}
                name="category"
                value="Project"
                defaultChecked={data.lesson.category === 'Project'}
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
                defaultChecked={data.lesson.level === 'Newbie'}
              >
                Newbie
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Beginner"
                defaultChecked={data.lesson.level === 'Beginner'}
              >
                Beginner
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Intermediate"
                defaultChecked={data.lesson.level === 'Intermediate'}
              >
                Intermediate
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Advanced"
                defaultChecked={data.lesson.level === 'Advanced'}
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
