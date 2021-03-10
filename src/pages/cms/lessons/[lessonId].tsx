import { useState, useEffect } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  useToast,
  Container,
} from '@chakra-ui/react'
import { DeleteIcon, RepeatIcon as GenerateIcon } from '@chakra-ui/icons'

import { Layout } from '@layouts'
import {
  Card,
  CategoryBadge,
  HeaderEditor,
  HeadingStack,
  Hero,
} from '@components'
import { CMSViewJSON } from '@components/cms'
import { CMSBlock, CMSBlockLinks } from '@components/cms/blocks'
import { useRedirectSignIn } from '@hooks'
import { slugify } from '@utils'

import dataTheme from '@theme/theme.json'
import dataLessons from '@data/lessons.json'

export default function CMSLessonId() {
  const router = useRouter()
  const { isAuthorized } = useRedirectSignIn()
  const [viewMode, setViewMode] = useState('result')
  const toast = useToast({ duration: 1000, position: 'bottom-left' })
  const { lessonId } = router.query

  /**
   * Should be from API later
   * Only used once to populate the initial state data
   */
  const lesson = dataLessons.find((lesson) => lesson.id === Number(lessonId))

  /**
   * Set state data with initial data
   * Used frequently when editing the lesson content
   */
  const [formLesson, setFormLesson] = useState(lesson)

  useEffect(() => {
    setFormLesson(lesson)
  }, [lesson])

  /**
   * Handle form's value local changes (state), reset, and save (API request)
   * Should be using Formik later
   */
  const handleChange = (event) => {
    setFormLesson({ ...formLesson, [event.target.name]: event.target.value })
  }

  const handleChangeRadio = (event) => {
    toast({ title: JSON.stringify(event.target, null, 2) })
  }

  const handleReset = () => {
    setFormLesson(lesson)
    toast({ title: 'Lesson data resetted!', status: 'info' })
  }

  const handleSave = () => {
    toast({ title: 'Lesson data saved!', status: 'success' })
  }

  const handleGenerateSlug = () => {
    try {
      const generatedSlug = slugify(formLesson.title)
      if (generatedSlug) {
        setFormLesson({ ...formLesson, slug: generatedSlug || '' })
        toast({
          description: generatedSlug,
          title: 'Slug generated!',
          status: 'success',
        })
      }
    } catch (error) {
      toast({ title: 'Slug error to generate!', status: 'error' })
    }
  }

  return (
    <Layout>
      {!formLesson && (
        <>
          <Text>Sorry, lesson with id #{lessonId} is not found.</Text>
        </>
      )}
      {isAuthorized && formLesson && (
        <>
          <NextHead>
            <title>Editing lesson #{formLesson.id} · Catamyst</title>
          </NextHead>
          <HeaderEditor
            name="lesson"
            item={formLesson}
            handleReset={handleReset}
            handleSave={handleSave}
            handleViewResult={() => setViewMode('result')}
            handleViewJSON={() => setViewMode('json')}
          />
          {viewMode === 'json' && (
            <CMSViewJSON name="Lesson" codeString={{ lesson: formLesson }} />
          )}
          {viewMode === 'result' && (
            <CMSViewResultLesson
              formLesson={formLesson}
              handleChange={handleChange}
              handleChangeRadio={handleChangeRadio}
              handleGenerateSlug={handleGenerateSlug}
            />
          )}
        </>
      )}
    </Layout>
  )
}

function CMSViewResultLesson({
  formLesson,
  handleChange,
  handleChangeRadio,
  handleGenerateSlug,
}) {
  /**
   * Formik can be used here to reduce handle change
   */

  return (
    <>
      <Hero>
        <Box id="lesson-hero" align="center" pb={5}>
          <Stack maxW={dataTheme.maxContentWidth}>
            <InputGroup size="sm">
              <InputLeftAddon
                rounded="md"
                children={`catamyst.com/learn/track/topic/`}
              />
              <Input
                isRequired
                name="slug"
                rounded="md"
                placeholder="lesson-slug"
                value={slugify(formLesson.slug) || slugify(formLesson.title)}
                onChange={handleChange}
              />
              <InputRightAddon
                as={IconButton}
                px={2}
                size="xs"
                aria-label="Generate slug"
                onClick={handleGenerateSlug}
                icon={<GenerateIcon />}
              />
            </InputGroup>
            <Input
              isRequired
              name="title"
              size="lg"
              fontFamily="heading"
              fontWeight="bold"
              fontSize="3xl"
              textAlign="center"
              placeholder="Lesson Title"
              value={formLesson.title || ''}
              onChange={handleChange}
            />
            <RadioGroup
              colorScheme="teal"
              name="category"
              onChange={handleChangeRadio}
              value={formLesson.category}
            >
              <Stack direction="row">
                <Text fontWeight="bold">Category:</Text>
                <Radio value="Fundamental">
                  <CategoryBadge category="Fundamental" />
                </Radio>
                <Radio value="Specific">
                  <CategoryBadge category="Specific" />
                </Radio>
                <Radio value="Project">
                  <CategoryBadge category="Project" />
                </Radio>
              </Stack>
            </RadioGroup>
            <RadioGroup
              colorScheme="teal"
              name="level"
              onChange={handleChangeRadio}
              value={formLesson.level}
            >
              <Stack direction="row">
                <Text fontWeight="bold">Level:</Text>
                <Radio value="Newbie">Newbie</Radio>
                <Radio value="Beginner">Beginner</Radio>
                <Radio value="Intermediate">Intermediate</Radio>
                <Radio value="Advanced">Advanced</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </Box>
      </Hero>

      <Container width="100%" maxW="1500px" pt={5} px={0}>
        <Stack align="center" spacing={10}>
          <HeadingStack>Content Blocks</HeadingStack>
          <Stack id="form-lesson-blocks" align="center" spacing={5}>
            {formLesson?.blocks &&
              (formLesson.blocks as any[]).map((block, index) => {
                return <CMSBlock key={index} block={block} />
              })}
          </Stack>

          <HeadingStack>References</HeadingStack>
          {formLesson?.references && (
            <CMSBlockLinks links={formLesson.references} />
          )}
        </Stack>
      </Container>
    </>
  )
}
