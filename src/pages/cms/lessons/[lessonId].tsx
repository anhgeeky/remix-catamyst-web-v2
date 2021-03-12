import { Fragment, useState, useEffect } from 'react'
import NextHead from 'next/head'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
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
  const { router, isAuthorized } = useRedirectSignIn()
  const { lessonId } = router.query
  const toast = useToast({ duration: 1000, position: 'bottom-left' })

  /**
   * State to change UI view mode
   */
  const [viewMode, setViewMode] = useState('result')

  /**
   * Should be from API. Used once to populate the initial state data
   * Wait until lesson data is ready
   */
  const lessonInitialValues = dataLessons.find(
    (lesson) => lesson.id === Number(lessonId)
  )

  useEffect(() => {
    if (lessonInitialValues) {
      // setValue('lesson', lessonInitialValues)
      reset({ lesson: lessonInitialValues })
    }
  }, [lessonInitialValues])

  /**
   * React Hook Form
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
    // console.log(JSON.stringify({ type: 'SAVE_LESSON', payload: data }, null, 2))
  }

  const handleDelete = () => {
    toast({ status: 'error', title: 'Deleted lesson data!' })
  }

  const handleReset = () => {
    toast({ status: 'info', title: 'Resetted lesson data!' })
    reset({ lesson: lessonInitialValues })
  }

  const handleBack = () => {
    router.push('/cms/lessons')
  }

  const handleGenerateSlug = () => {
    try {
      const values = getValues()
      const generatedSlug = slugify(values.lesson.title)
      if (generatedSlug) {
        setValue('lesson.slug', generatedSlug)
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
              register={register}
              getValues={getValues}
              handleGenerateSlug={handleGenerateSlug}
              lessonInitialValues={lessonInitialValues}
            />
          )}
          {viewMode === 'json' && <CMSViewJSON codeString={getValues()} />}
          <DevTool control={control} />
        </>
      )}
    </Layout>
  )
}

function CMSViewResultLesson({
  register,
  getValues,
  handleGenerateSlug,
  lessonInitialValues,
}) {
  /**
   * RHF can be used here to reduce handle change
   */

  return (
    <>
      <Hero>
        <Box align="center" pb={5}>
          <Stack maxW={dataTheme.maxContentWidth}>
            <InputGroup size="sm" variant="unstyled">
              <InputLeftAddon
                opacity={0.5}
                children={`catamyst.com/learn/track/topic/`}
              />
              <Input
                ref={register}
                name="lesson.slug"
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
              name="lesson.title"
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
                  name="lesson.category"
                  value="Fundamental"
                  defaultChecked={
                    lessonInitialValues.category === 'Fundamental'
                  }
                >
                  <CategoryBadge category="Fundamental" />
                </Radio>
                <Radio
                  ref={register}
                  name="lesson.category"
                  value="Specific"
                  defaultChecked={lessonInitialValues.category === 'Specific'}
                >
                  <CategoryBadge category="Specific" />
                </Radio>
                <Radio
                  ref={register}
                  name="lesson.category"
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
                  name="lesson.level"
                  value="Newbie"
                  defaultChecked={lessonInitialValues.level === 'Newbie'}
                >
                  Newbie
                </Radio>
                <Radio
                  ref={register}
                  name="lesson.level"
                  value="Beginner"
                  defaultChecked={lessonInitialValues.level === 'Beginner'}
                >
                  Beginner
                </Radio>
                <Radio
                  ref={register}
                  name="lesson.level"
                  value="Intermediate"
                  defaultChecked={lessonInitialValues.level === 'Intermediate'}
                >
                  Intermediate
                </Radio>
                <Radio
                  ref={register}
                  name="lesson.level"
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
          {JSON.stringify(getValues(), null, 2)}
          {!lessonInitialValues?.blocks && <CMSBlockAdderButtons />}
          {lessonInitialValues?.blocks &&
            lessonInitialValues?.blocks.map((block, index) => {
              return (
                <Fragment key={index}>
                  <CMSBlock
                    block={block}
                    // setValue={setValue}
                  />
                  <CMSBlockAdderButtons />
                </Fragment>
              )
            })}
        </Stack>
      </Container>
    </>
  )
}
