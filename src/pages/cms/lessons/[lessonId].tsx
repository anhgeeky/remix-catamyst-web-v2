import {
  Box,
  Button,
  Container,
  Heading,
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
  useToast,
} from '@chakra-ui/react'
import { Fragment, useState, useEffect } from 'react'
import NextHead from 'next/head'
import { useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

import { Layout } from '@layouts'
import {
  Icon,
  CategoryBadge,
  HeaderEditor,
  HeadingStack,
  Hero,
} from '@components'
import { CMSViewJSON } from '@components/cms'
import { CMSBlock, CMSBlockAdderButtons } from '@components/cms/blocks'
import { useRedirectSignIn } from '@hooks'
import { slugify, initBlock } from '@utils'

import dataLessons from '@data/lessons.json'

/**-----------------------------------------------------------------------------
 * CMS Lesson editor, with UI and logic
 -----------------------------------------------------------------------------*/
export default function CMSLessonId() {
  const NODE_ENV = process.env.NODE_ENV
  const { router, isAuthorized } = useRedirectSignIn()
  const { lessonId } = router.query
  const toast = useToast({ duration: 1000, position: 'bottom-left' })

  /**
   * State to change UI view mode.
   * Might not work well yet with RHF.
   */
  const [viewMode, setViewMode] = useState('result')

  /**
   * Data that should be from API. Used once to populate the initial state data.
   * But need to wait until lesson data is ready to be used in UI.
   */
  const lessonInitialValues = dataLessons.find(
    (lesson) => lesson.id === Number(lessonId)
  )

  /**
   * Initialize RHF values with data from API.
   */
  useEffect(() => {
    if (lessonInitialValues) {
      // setValue('lesson', lessonInitialValues)
      reset({ ...lessonInitialValues })
    }
  }, [lessonInitialValues])

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
    console.log(JSON.stringify({ type: 'SAVE_LESSON', payload: data }, null, 2))
  }

  const handleDelete = () => {
    toast({ status: 'error', title: 'Deleted lesson data!' })
  }

  const handleReset = () => {
    toast({ title: 'Resetted lesson data!', status: 'warning' })
    reset({ ...lessonInitialValues })
  }

  const handleBack = () => {
    router.push('/cms/lessons')
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
   * User interface
   */
  return (
    <Layout>
      {isAuthorized && lessonInitialValues && getValues() && (
        <>
          <NextHead>
            <title>Lesson #{lessonInitialValues.id} · Catamyst</title>
          </NextHead>
          <HeaderEditor
            name="lesson"
            item={lessonInitialValues}
            handleBack={handleBack}
            handleDelete={handleDelete}
            handleReset={handleReset}
            handleSave={handleSave}
            handleSubmit={handleSubmit}
            handleViewResult={() => setViewMode('result')}
            handleViewJSON={() => setViewMode('json')}
          />
          {viewMode === 'result' && (
            <CMSViewResultLesson
              control={control}
              register={register}
              handleGenerateSlug={handleGenerateSlug}
              lessonInitialValues={lessonInitialValues}
            />
          )}
          {viewMode === 'json' && <CMSViewJSON codeString={getValues()} />}
          {NODE_ENV !== 'production' && <DevTool control={control} />}
        </>
      )}
    </Layout>
  )
}

/**-----------------------------------------------------------------------------
 * The actual lesson content that utilize RHF field array helpers.
 -----------------------------------------------------------------------------*/
function CMSViewResultLesson({
  control,
  register,
  handleGenerateSlug,
  lessonInitialValues,
}) {
  const toast = useToast({ duration: 1000, position: 'bottom-left' })

  /**
   * RHF (React Hook Form) field array with helpers.
   * Get control from instantiated useForm from parent component.
   */
  const { append, fields, insert, move, prepend, remove } = useFieldArray({
    control,
    name: 'blocks',
  })
  console.log(fields)

  /**
   * Toggle block by index to change isPublished true or false
   */
  const togglePublishBlock = (event) => {
    if (event.target.checked) {
      toast({ title: 'Published block', status: 'success' })
    } else {
      toast({ title: 'Unpublished block', status: 'warning' })
    }
  }

  /**
   * Add block to the first index.
   */
  const prependBlock = (index, type) => {
    prepend(initBlock(type))
    toast({ title: 'Prepended block above' })
  }

  /**
   * Add block to the selected index.
   */
  const insertBlock = (index, type) => {
    insert(index + 1, initBlock(type))
    toast({ title: 'Inserted block here' })
  }

  /**
   * Add block to the last index.
   */
  const appendBlock = (index, type) => {
    append(initBlock(type))
    toast({ title: 'Appended block below' })
  }

  /**
   * Move block to previous index or next index.
   */
  const moveBlock = (direction) => {
    toast({ title: `Moved block ${direction}` })
  }

  /**
   * Remove block by index that passed down into each CMS Block.
   */
  const removeBlock = (index) => {
    toast({ title: 'Removed block', status: 'error' })
    remove(index) //
  }

  /**
   * UI for lesson meta and blocks.
   */
  return (
    <>
      <CMSLessonHero
        register={register}
        lessonInitialValues={lessonInitialValues}
        handleGenerateSlug={handleGenerateSlug}
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
function CMSLessonHero({ register, lessonInitialValues, handleGenerateSlug }) {
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
                onClick={handleGenerateSlug}
              />
            </Tooltip>
          </InputGroup>

          <Input
            ref={register}
            name="title"
            size="lg"
            fontFamily="heading"
            fontWeight="bold"
            fontSize="3xl"
            textAlign="center"
            p={3}
            variant="unstyled"
            placeholder="Lesson Title"
            isRequired
          />

          <RadioGroup colorScheme="teal">
            <Stack direction="row">
              <Text fontWeight="bold">Category:</Text>
              <Radio
                ref={register}
                name="category"
                value="Fundamental"
                defaultChecked={lessonInitialValues.category === 'Fundamental'}
              >
                <CategoryBadge category="Fundamental" />
              </Radio>
              <Radio
                ref={register}
                name="category"
                value="Specific"
                defaultChecked={lessonInitialValues.category === 'Specific'}
              >
                <CategoryBadge category="Specific" />
              </Radio>
              <Radio
                ref={register}
                name="category"
                value="Project"
                defaultChecked={lessonInitialValues.category === 'Project'}
              >
                <CategoryBadge category="Project" />
              </Radio>
            </Stack>
          </RadioGroup>

          <RadioGroup colorScheme="teal">
            <Stack direction="row">
              <Text fontWeight="bold">Level:</Text>
              <Radio
                ref={register}
                name="level"
                value="Newbie"
                defaultChecked={lessonInitialValues.level === 'Newbie'}
              >
                Newbie
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Beginner"
                defaultChecked={lessonInitialValues.level === 'Beginner'}
              >
                Beginner
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Intermediate"
                defaultChecked={lessonInitialValues.level === 'Intermediate'}
              >
                Intermediate
              </Radio>
              <Radio
                ref={register}
                name="level"
                value="Advanced"
                defaultChecked={lessonInitialValues.level === 'Advanced'}
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
