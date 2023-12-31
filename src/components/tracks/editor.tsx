import { useState } from 'react'
import NextHead from 'next/head'
import NextImage from 'next/image'
import {
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
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import {
  Card,
  LearningTag,
  ContentWithSidebar,
  HeaderEditor,
  Hero,
  Icon,
  useToast,
} from '@/components'
import { TopicIconTitleHeadingThree } from '@/components/topics'
import { CMSViewJSON } from '@/components/cms'
import { slugify } from '@/utils'
import { useRedirectHome, useTrackById } from '@/hooks'

export function TrackEditor({ trackId }) {
  const globalState = useRedirectHome()
  const toast = useToast({ duration: 1000 })
  const [viewMode, setViewMode] = useState('result')
  const { data, isLoading, isError } = useTrackById(trackId)

  const handleSaveChanges = () => {
    // POST to /api/tracks/id/{trackId}
    toast({ title: 'Saved track!', status: 'success' })
  }
  const handleBack = () => {
    globalState.router.push('/cms/tracks')
  }
  const handleDelete = () => {
    toast({ title: 'Deleted track!', status: 'error' })
  }

  return (
    <>
      {isError && (
        <>
          <Text>Failed to get track with id #{trackId}</Text>
        </>
      )}
      {isLoading && (
        <>
          <Text>Loading track with id #{trackId}...</Text>
        </>
      )}
      {!isLoading && !data.track && (
        <>
          <Text>Sorry, track with id #{trackId} is not found.</Text>
        </>
      )}

      {!isLoading && data.track && data.topics && (
        <>
          <NextHead>
            <title>Lesson #{data.track.id} · Catamyst</title>
          </NextHead>

          <HeaderEditor
            name="track"
            data={data.track}
            register={() => {
              console.info('React Hook Form register')
            }}
            actions={{
              handleBack,
              handleDelete,
              handleReset: () => {
                console.info('Handle reset')
              },
              handleSubmit: () => {
                console.info('Handle submit')
              },
              handleSaveChanges,
              handleViewResult: () => setViewMode('result'),
              handleViewJSON: () => setViewMode('json'),
            }}
          />

          {viewMode === 'json' && (
            <CMSViewJSON name="Track and Topics" codeString={data} />
          )}

          {viewMode === 'result' && (
            <CMSViewResultTrack toast={toast} data={data} />
          )}
        </>
      )}
    </>
  )
}

function CMSViewResultTrack({ toast, data }) {
  return (
    <>
      <Hero>
        <Wrap as={Stack} spacing={5}>
          <WrapItem>
            <NextImage
              alt={`Icon of ${data.track.title}`}
              src={data.track.icon_url}
              width={100}
              height={100}
              layout="fixed"
            />
          </WrapItem>
          <WrapItem as={Stack} width="100%" maxW="600px">
            <InputGroup size="sm">
              <InputLeftAddon rounded="md">catamyst.com/learn/</InputLeftAddon>
              <Input
                isRequired
                name="slug"
                rounded="md"
                placeholder="track-slug"
                defaultValue={
                  slugify(data.track.slug) || slugify(data.track.title)
                }
              />
            </InputGroup>
            <Input
              isRequired
              name="title"
              size="lg"
              fontFamily="heading"
              fontWeight="700"
              fontSize="3xl"
              placeholder="Track Title"
              defaultValue={data.track.title}
            />
            <Textarea
              isRequired
              name="description"
              placeholder="Tell some short description."
              defaultValue={data.track.description}
            />
          </WrapItem>
        </Wrap>
      </Hero>

      <ContentWithSidebar>
        <Stack maxW={{ lg: '280px' }} width="100%" spacing={2}>
          <Heading as="h2" size="sm">
            About this track
          </Heading>
          <CheckboxGroup
            // name="levels"
            colorScheme="teal"
            defaultValue={data.track.levels}
          >
            <Stack direction="column">
              <Checkbox name="levels" value="Newbie">
                Newbie
              </Checkbox>
              <Checkbox name="levels" value="Beginner">
                Beginner
              </Checkbox>
              <Checkbox name="levels" value="Intermediate">
                Intermediate
              </Checkbox>
              <Checkbox name="levels" value="Advanced">
                Advanced
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <HStack>
            <NumberInput
              name="totalTopics"
              maxW={20}
              min={2}
              max={200}
              defaultValue={data.track.totalTopics}
              isDisabled
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">topics</Text>
          </HStack>
          <HStack>
            <NumberInput
              name="total_lessons"
              maxW={20}
              min={2}
              defaultValue={data.track.total_lessons}
              isDisabled
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">lessons</Text>
          </HStack>
          <HStack>
            <NumberInput
              name="total_hours"
              maxW={20}
              min={10}
              defaultValue={data.track.total_hours}
              isDisabled
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">hours</Text>
          </HStack>
          <HStack>
            <NumberInput
              name="totalMonths"
              maxW={12}
              min={1}
              defaultValue={data.track.totalMonths}
              isDisabled
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">months</Text>
          </HStack>
        </Stack>

        <Stack width="100%">
          <ButtonGroup size="xs">
            <Button
              leftIcon={<Icon name="add" />}
              colorScheme="teal"
              onClick={() =>
                toast({ title: 'Added a topic', status: 'success' })
              }
            >
              Add Topic
            </Button>
            <Button
              leftIcon={<Icon name="delete" />}
              colorScheme="red"
              onClick={() =>
                toast({ title: 'Removed all topics!', status: 'error' })
              }
            >
              Remove All
            </Button>
          </ButtonGroup>

          {data.topics?.length < 1 && <Text>No topics yet.</Text>}

          {data.topics.map((topic) => {
            return (
              <Card p={2} key={topic.id}>
                <HStack justify="space-between">
                  <HStack spacing={1}>
                    <ButtonGroup spacing={0} variant="ghost" size="xs">
                      <IconButton
                        icon={<Icon name="up" />}
                        aria-label={`Move up ${topic.title}`}
                      />
                      <IconButton
                        icon={<Icon name="down" />}
                        aria-label={`Move down ${topic.title}`}
                      />
                    </ButtonGroup>
                    <TopicIconTitleHeadingThree topic={topic} />
                  </HStack>

                  <HStack spacing={1}>
                    <LearningTag category={topic.category} />
                    <ButtonGroup spacing={1} variant="ghost" size="xs">
                      <IconButton
                        colorScheme="gray"
                        aria-label={`Edit ${topic.title}`}
                        icon={<Icon name="edit" />}
                        onClick={() => toast({ title: 'Opened to edit' })}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label={`Remove ${topic.title}`}
                        icon={<Icon name="delete" />}
                        onClick={() =>
                          toast({
                            title: `Removed ${topic.title}`,
                            status: 'error',
                          })
                        }
                      />
                    </ButtonGroup>
                  </HStack>
                </HStack>
              </Card>
            )
          })}
        </Stack>
      </ContentWithSidebar>
    </>
  )
}
