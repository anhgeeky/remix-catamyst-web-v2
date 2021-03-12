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
import { slugify } from '@utils'

import dataTheme from '@theme/theme.json'
import dataLessons from '@data/lessons.json'

export default function CMSLessonId() {
  const NODE_ENV = process.env.NODE_ENV
  const { router, isAuthorized } = useRedirectSignIn()
  const { lessonId } = router.query
  const toast = useToast({ duration: 1000, position: 'bottom-left' })

  /**
   * State to change UI view mode.
   */
  const [viewMode, setViewMode] = useState('result')

  /**
   * Should be from API. Used once to populate the initial state data.
   * But wait until lesson data is ready.
   */
  const lessonInitialValues = dataLessons.find(
    (lesson) => lesson.id === Number(lessonId)
  )

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
    toast({ status: 'info', title: 'Resetted lesson data!' })
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
          status: 'success',
          title: 'Slug generated!',
          description: generatedSlug,
        })
      }
    } catch (error) {
      toast({ status: 'error', title: 'Slug error to generate!' })
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
            <title>
              #{lessonInitialValues.id} {lessonInitialValues.title} · Catamyst
            </title>
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
              getValues={getValues}
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

function CMSViewResultLesson({
  getValues,
  control,
  register,
  handleGenerateSlug,
  lessonInitialValues,
}) {
  const toast = useToast({ duration: 1000, position: 'bottom-right' })

  /**
   * RHF (React Hook Form) field array
   */
  const { append, fields, insert, move, prepend, remove } = useFieldArray({
    control,
    name: 'blocks',
  })

  const appendBlock = () => {
    toast({ title: 'Appended below' })
  }
  const insertBlock = () => {
    toast({ title: 'Inserted here' })
  }
  const moveBlock = (direction) => {
    toast({ title: `Moved ${direction}` })
  }
  const prependBlock = () => {
    toast({ title: 'Prepended above' })
  }
  const removeBlock = () => {
    toast({ title: 'Removed', status: 'error' })
  }

  return (
    <>
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
                  defaultChecked={
                    lessonInitialValues.category === 'Fundamental'
                  }
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

      <Container width="100%" maxW="1500px" pt={5} px={0}>
        <Stack id="form-lesson-blocks" align="center" spacing={5}>
          <CMSBlockAdderButtons name="prepend" actions={{ prependBlock }} />
          {fields &&
            fields.map((block, index) => {
              return (
                <Fragment key={block.id}>
                  {/* Each CMSBlock type contains CMSBlockModifierButtons */}
                  <CMSBlock
                    block={{ ...block, index }}
                    actions={{
                      register,
                      appendBlock,
                      insertBlock,
                      moveBlock,
                      prependBlock,
                      removeBlock,
                    }}
                  />
                  <CMSBlockAdderButtons
                    name="insert"
                    actions={{ insertBlock }}
                  />
                </Fragment>
              )
            })}
          <CMSBlockAdderButtons name="append" actions={{ appendBlock }} />
        </Stack>
      </Container>
    </>
  )
}
