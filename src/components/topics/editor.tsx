import NextHead from 'next/head'
import {
  Box,
  Container,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { Fragment, useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import { Icon, HeaderEditor, Hero, useToast } from '@/components'
import { CMSViewJSON } from '@/components/cms'
import { CMSTopicSection } from '@/components/cms/sections'

import { slugify } from '@/utils'
import { useRedirectHome, useTopicById, mutateSWR } from '@/hooks'
import { supabase } from '@/lib'
// import { updateTopic } from '@/mutations'

/**-----------------------------------------------------------------------------
 * CMS Topic editor, with UI and logic
 -----------------------------------------------------------------------------*/
export function TopicEditor({ topicId }) {
  const toast = useToast()
  const globalState = useRedirectHome()
  const { data, isLoading, isError } = useTopicById(topicId)
  const [viewMode, setViewMode] = useState('result')

  /**
   * All local state change is handled by RHF (React Hook Form).
   * API call is only used when necessary via handle functions.
   */
  const { control, getValues, handleSubmit, register, reset, setValue } =
    useForm({
      mode: 'onSubmit',
    })

  useEffect(() => {
    if (!isLoading && data) {
      reset({
        ...data,
        is_published: data.is_published || true,
        sections: data.sections || [],
      })
    }
  }, [isLoading, data])

  const handleBack = () => {
    globalState.router.push('/cms/topics')
  }

  /**
   * Open in single page view
   */
  const handleView = (url) => {
    globalState.router.push(url)
  }

  /**
   * No request, just local change.
   */
  const handleReset = () => {
    toast({ title: 'Resetted topic data!', status: 'warning' })
    reset(data)
  }

  /**
   * @/mutations/topic
   * PATCH /api/topics/id/{topicId}
   */
  const handleSaveChanges = async (body) => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .update({
          ...body,
          sections: body?.sections || [],
        })
        .eq('id', topicId)
        .single()
      if (error) throw error

      toast({ status: 'success', title: 'Saved topic data!' })
      mutateSWR(`/api/topics/id/${topicId}`, data)
    } catch (error) {
      console.warn(error)
      let errorText = 'Unknown problem.'
      if (error.code === '23505') {
        errorText = 'Slug is already exist.'
      }
      toast({
        status: 'error',
        title: 'Failed to save topic data!',
        description: errorText,
      })
    }
  }

  /**
   * @/mutations/topic
   * DELETE /api/topics/id/{topicId}
   */
  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .delete()
        .eq('id', topicId)
      if (!data || error) throw error

      globalState.router.replace('/cms/topics')
      toast({ status: 'error', title: 'Deleted topic!' })
    } catch (error) {
      console.error(error)
      toast({ status: 'error', title: 'Failed to delete topic!' })
    }
  }

  /**
   * @/mutations/topic
   * PATCH /api/topics/id/{topicId}
   */
  const handleTogglePublish = async () => {
    try {
      const localData = getValues()
      toast({
        title: localData.is_published ? 'Unpublished!' : 'Published',
        status: localData.is_published ? 'warning' : 'success',
      })
    } catch (error) {
      toast({ title: 'Failed to publish topic!', status: 'error' })
    }
  }

  /**
   * No request, just local change.
   */
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

  return (
    <>
      {isError && (
        <>
          <Text>Failed to get topic with id #{topicId}</Text>
        </>
      )}
      {isLoading && (
        <>
          <Text>Loading topic with id #{topicId}...</Text>
        </>
      )}
      {!isLoading && !data && (
        <>
          <Text>Sorry, topic with id #{topicId} is not found.</Text>
        </>
      )}

      {!isLoading && data && getValues() && (
        <>
          <NextHead>
            <title>Topic #{data.id} · Catamyst</title>
          </NextHead>

          <HeaderEditor
            name="topic"
            data={data}
            register={register}
            actions={{
              handleBack,
              handleView,
              handleDelete,
              handleReset,
              handleSubmit,
              handleSaveChanges,
              handleTogglePublish,
              handleViewResult: () => setViewMode('result'),
              handleViewJSON: () => setViewMode('json'),
            }}
          />

          {viewMode === 'json' && (
            <CMSViewJSON name="Topic" codeString={getValues()} />
          )}

          {viewMode === 'result' && (
            <CMSViewResultTopic
              control={control}
              register={register}
              actions={{
                handleGenerateSlug,
                setValue,
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
 * The actual topic content that utilize RHF field array helpers.
 -----------------------------------------------------------------------------*/
function CMSViewResultTopic(props) {
  const toast = useToast()

  /**
   * RHF (React Hook Form) useForm control and register
   */
  const { data, control, register, actions } = props

  /**
   * RHF (React Hook Form) field array with helpers.
   * Get control from instantiated useForm in parent component.
   */
  const { append, fields, move, prepend, remove } = useFieldArray({
    control,
    name: 'sections',
  })

  /**
   * Add section to the first.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const prependSection = (index) => {
    try {
      prepend({
        title: 'Untitled section',
        lessons: [],
      })
      toast({ title: 'Prepended section above' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to prepend section above' })
    }
  }

  /**
   * Add section to the last.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const appendSection = (index) => {
    try {
      append({
        title: 'Untitled section',
        lessons: [],
      })
      toast({ title: 'Appended section below' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to append section below' })
    }
  }

  /**
   * Move section to previous index or next index.
   */
  const moveSection = (index, direction) => {
    try {
      if (direction === 'up' && index !== 0) {
        move(index, index - 1)
        toast({ title: `Moved section ${direction}` })
      }
      if (direction === 'down' && index !== fields?.length) {
        move(index, index + 1)
        toast({ title: `Moved section ${direction}` })
      }
    } catch (error) {
      toast({ status: 'error', title: `Failed to move section ${direction}` })
    }
  }

  /**
   * Remove section by index that passed down into each CMS Section.
   */
  const removeSection = (index) => {
    try {
      remove(index)
      toast({ title: `Removed section ${index}`, status: 'error' })
    } catch (error) {
      toast({ status: 'error', title: `Failed to remove section ${index}` })
    }
  }

  /**
   * UI for topic meta and sections (which contains links to lessons).
   */
  return (
    <>
      <CMSTopicHero register={register} data={data} actions={actions} />

      <Container width="100%" maxW="1500px" pt={5} px={0}>
        <Stack id="form-topic-sections" align="center" spacing={5}>
          {fields.map((section, index) => {
            return (
              <Fragment key={section.id}>
                <CMSTopicSection
                  key={section.id}
                  index={index}
                  section={section}
                  actions={{
                    ...actions,
                    control,
                    register,
                    moveSection,
                    removeSection,
                  }}
                />
              </Fragment>
            )
          })}
        </Stack>
      </Container>
    </>
  )
}

/**-----------------------------------------------------------------------------
 * UI for topic meta only, placed inside hero.
 * Contains slug, title, description, category, icon_emoji, icon_url
 * levels, total_lessons, total_hours, total_days
 -----------------------------------------------------------------------------*/
function CMSTopicHero(props) {
  const { register, data, actions } = props

  return (
    <Hero>
      <Box align="center" pb={5}>
        <Stack maxW={760}>
          <InputGroup size="sm" variant="unstyled">
            <InputLeftAddon opacity={0.5}>
              catamyst.com/learn/track/
            </InputLeftAddon>
            <Input
              name="slug"
              ref={register}
              defaultValue={data.slug}
              placeholder="topic-slug"
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
            name="title"
            ref={register}
            defaultValue={data.title}
            size="lg"
            fontFamily="heading"
            fontWeight="700"
            fontSize="3xl"
            textAlign="center"
            p={3}
            variant="unstyled"
            placeholder="Topic Title"
            isRequired
          />
        </Stack>
      </Box>
    </Hero>
  )
}
