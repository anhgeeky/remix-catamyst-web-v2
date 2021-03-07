import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import NextHead from 'next/head'
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Code,
  Flex,
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
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import {
  AddIcon,
  ChevronDownIcon as DownIcon,
  ChevronUpIcon as UpIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons'

import { Layout } from '@layouts'
import {
  Card,
  CategoryBadge,
  Content,
  ContentWithSidebar,
  HeaderEditor,
  HeadingStack,
  Hero,
} from '@components'
import { useRedirectSignIn } from '@hooks'

import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function CMSTrackId() {
  const router = useRouter()
  const { isAuthorized } = useRedirectSignIn()
  const [viewMode, setViewMode] = useState('result')
  const toast = useToast({
    position: 'bottom-left',
    duration: 1000,
  })

  /**
   * Should be from API later
   */
  const track = dataTracks.find(
    (track) => track.id === Number(router.query.trackId)
  )

  /**
   * Set default form value type based on data
   * But also wait until value from data is ready to be used with form value
   */
  const [formTrack, setFormTrack] = useState(track)
  const [formTopics, setFormTopics] = useState([])

  useEffect(() => {
    setFormTrack(track)
    if (formTrack) {
      const topics = dataTopics.filter((topic) => {
        return formTrack.topics.includes(topic.id)
      })
      setFormTopics(topics)
    }
  }, [track])

  /**
   * Handle form's value local changes (state) and handle save (API request)
   * Should be using Formik later
   */
  const handleChange = (event) => {
    setFormTrack({ ...formTrack, [event.target.name]: event.target.value })
  }
  const handleSave = () => {
    toast({ title: 'Track saved!', status: 'success', isClosable: true })
  }

  /**
   * Handle view result and JSON for inspecting or debugging purpose
   */
  const handleViewResult = () => setViewMode('result')
  const handleViewJSON = () => setViewMode('json')

  return (
    <Layout>
      {isAuthorized && formTrack && formTopics && (
        <>
          <NextHead>
            <title>Editing track #{formTrack.id} · Catamyst</title>
          </NextHead>
          <HeaderEditor
            name="track"
            item={formTrack}
            handleSave={handleSave}
            handleViewResult={handleViewResult}
            handleViewJSON={handleViewJSON}
          />
          {viewMode === 'json' && (
            <ViewJSON
              name="Track and Topics"
              codeString={{
                track: formTrack,
                topics: formTopics,
              }}
            />
          )}
          {viewMode === 'result' && (
            <ViewResult
              toast={toast}
              handleChange={handleChange}
              formTrack={formTrack}
              formTopics={formTopics}
            />
          )}
        </>
      )}
    </Layout>
  )
}

function ViewJSON({ name, codeString }) {
  return (
    <Content>
      <Stack spacing={5} width="100%">
        <HeadingStack>{name}:</HeadingStack>
        <SyntaxHighlighter
          language="json"
          style={style}
          wrapLines
          wrapLongLines
          showLineNumbers
          // showInlineLineNumbers
        >
          {JSON.stringify(codeString, null, 2)}
        </SyntaxHighlighter>
      </Stack>
    </Content>
  )
}

function ViewResult({ toast, handleChange, formTrack, formTopics }) {
  return (
    <>
      <Hero>
        <Wrap as={Stack} spacing={5}>
          <WrapItem>
            <NextImage
              alt={`Icon of ${formTrack.title}`}
              src={formTrack.iconUrl}
              width={100}
              height={100}
              layout="fixed"
            />
          </WrapItem>
          <WrapItem as={Stack} width="100%" maxW="600px">
            <InputGroup size="sm">
              <InputLeftAddon rounded="md" children="catamyst.com/learn/" />
              <Input
                isRequired
                name="slug"
                rounded="md"
                placeholder="track-slug"
                value={formTrack.slug}
                onChange={handleChange}
              />
            </InputGroup>
            <Input
              isRequired
              name="title"
              size="lg"
              fontFamily="heading"
              fontWeight="bold"
              fontSize="3xl"
              placeholder="Track Title"
              value={formTrack.title}
              onChange={handleChange}
            />
            <Textarea
              isRequired
              name="description"
              placeholder="Tell some short description."
              value={formTrack.description}
              onChange={handleChange}
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
            defaultValue={formTrack.levels}
          >
            <Stack direction="column">
              <Checkbox value="Newbie">Newbie</Checkbox>
              <Checkbox value="Beginner">Beginner</Checkbox>
              <Checkbox value="Intermediate">Intermediate</Checkbox>
              <Checkbox value="Advanced">Advanced</Checkbox>
            </Stack>
          </CheckboxGroup>
          <HStack>
            <NumberInput
              name="totalTopics"
              maxW={20}
              min={2}
              // max={200}
              defaultValue={formTrack.totalTopics}
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">topics</Text>
          </HStack>
          <HStack>
            <NumberInput
              name="totalLessons"
              maxW={20}
              min={2}
              defaultValue={formTrack.totalLessons}
              onChange={handleChange}
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">lessons</Text>
          </HStack>
          <HStack>
            <NumberInput
              name="totalHours"
              maxW={20}
              min={10}
              defaultValue={formTrack.totalHours}
            >
              <NumberInputField />
            </NumberInput>
            <Text as="span">hours (estimated)</Text>
          </HStack>
        </Stack>

        <Stack width="100%">
          <HStack>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              onClick={() =>
                toast({ title: 'Added a topic', status: 'success' })
              }
            >
              Add Topic
            </Button>
          </HStack>
          {formTopics.length < 1 && <Text>No topics yet.</Text>}
          {formTopics.map((topic) => {
            return (
              <Card p={2} key={topic.id}>
                <HStack justify="space-between">
                  <HStack spacing={1}>
                    <ButtonGroup spacing={0} variant="ghost" size="xs">
                      <IconButton
                        icon={<UpIcon />}
                        aria-label={`Move up ${topic.title}`}
                      />
                      <IconButton
                        icon={<DownIcon />}
                        aria-label={`Move down ${topic.title}`}
                      />
                    </ButtonGroup>
                    <Heading as="h3" size="md">
                      {topic.iconEmoji} {topic.title}
                    </Heading>
                  </HStack>

                  <HStack spacing={1}>
                    <CategoryBadge category={topic.category} />
                    <ButtonGroup spacing={1} variant="ghost" size="xs">
                      <IconButton
                        colorScheme="gray"
                        aria-label={`Edit ${topic.title}`}
                        icon={<EditIcon />}
                        onClick={() => toast({ title: 'Opened to edit' })}
                      />
                      <IconButton
                        colorScheme="red"
                        aria-label={`Remove ${topic.title}`}
                        icon={<DeleteIcon />}
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
