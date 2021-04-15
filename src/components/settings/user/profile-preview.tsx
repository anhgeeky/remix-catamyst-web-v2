import { useEffect, useReducer } from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  chakra,
  Link,
  Flex,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Avatar,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { Card, Country, Icon, SocialLinks, LinkButton } from '@components'
import { supabase } from '@lib'
import { Profile } from '@types'
import { isDev, trimUrl, getCompleteDateTime } from '@utils'

type State = { profile: Profile }
type Action = { type?: string; payload: any }

/**
 * Since we want this component to update in realtime,
 * we should use "useReducer" for sending Realtime events
 */
export const profileEventReducer = (state: State, action: Action) => {
  if (action.type === 'SET_INITIAL_PROFILE') {
    return { profile: action.payload }
  } else if (action.type === 'UPDATE_PROFILE') {
    return { profile: action.payload }
  } else {
    return { profile: {} }
  }
}

export function UserProfilePreview({ profile }) {
  const initialState: State = profile
  const [localState, localDispatch] = useReducer(
    profileEventReducer,
    initialState
  )

  useEffect(() => {
    // if (isDev) console.log('SET_INITIAL_PROFILE', 'preview')
    try {
      localDispatch({ type: 'SET_INITIAL_PROFILE', payload: profile })
    } catch (error) {
      console.error(`>>> ${error.message}`)
    }
  }, [profile])

  useEffect(() => {
    // if (isDev) console.log('UPDATE_PROFILE', 'preview')
    try {
      const subscription = supabase
        .from(`profiles:id=eq.${profile.id}`)
        .on('*', (payload) => {
          localDispatch({ type: 'UPDATE_PROFILE', payload: payload.new })
        })
        .subscribe()
      return () => {
        supabase.removeSubscription(subscription)
      }
    } catch (error) {
      console.error(`>>> ${error.message}`)
    }
  }, [])

  if (!localState.profile) {
    return <div>Loading...</div>
  }
  return <ProfileCard profile={localState.profile} />
}

export default function ProfileCard({ profile }) {
  const [isTooSmall] = useMediaQuery('(max-width: 48em)')

  if (isDev) {
    console.log({ profile })
  }

  return (
    <Stack className={!isTooSmall && 'sticky'} spacing={5}>
      <Card
        className="profile-preview"
        maxW={{ md: '400px' }}
        width="100%"
        p={0}
      >
        <Box>
          <Flex justify="center">
            <Flex
              className="next-image-container"
              width="100%"
              overflow="auto"
              borderTopRadius="md"
              bg={useColorModeValue('gray.200', 'gray.500')}
            >
              <NextImage
                alt={`Cover picture of ${profile.name}`}
                src={
                  profile.cover_url ||
                  `https://storage.catamyst.com/covers/grass.jpg`
                }
                layout="fixed"
                objectFit="cover"
                width={720}
                height={100}
              />
            </Flex>
          </Flex>

          <Stack p={5}>
            <VStack spacing={2} mt="-75px">
              <Box
                rounded="full"
                p={1}
                zIndex={1}
                bg={useColorModeValue('gray.50', 'gray.900')}
              >
                <Avatar
                  name={profile.name}
                  src={profile?.avatar_url}
                  size="xl"
                />
              </Box>
              <Heading as="h2" size="lg">
                {profile.name}
              </Heading>
              <Heading as="h3" size="sm" fontFamily="body">
                {!profile.handle && (
                  <chakra.span fontStyle="italic" color="gray.500">
                    @username
                  </chakra.span>
                )}
                {profile.handle && (
                  <NextLink href={`/${profile.handle}`} passHref>
                    <Link>@{profile.handle}</Link>
                  </NextLink>
                )}
              </Heading>
            </VStack>

            <Stack spacing={2} py={3} width="100%">
              {profile.headline && (
                <Heading as="h4" size="sm" color="gray.500">
                  {profile.headline}
                </Heading>
              )}
              <Box>{ReactHtmlParser(profile.bio_html)}</Box>
            </Stack>

            <Flex>
              <HStack spacing={2}>
                <Icon name="organization" />
                <Text>
                  <span>
                    {profile.work?.title || (
                      <chakra.span fontStyle="italic" color="gray.500">
                        Title
                      </chakra.span>
                    )}
                    {', '}
                  </span>
                  {profile.work?.handle ? (
                    <NextLink href={`/${profile.work?.handle}`} passHref>
                      <Link color="teal.500">
                        {profile.work?.name || (
                          <chakra.span fontStyle="italic" color="gray.500">
                            Organization
                          </chakra.span>
                        )}
                      </Link>
                    </NextLink>
                  ) : profile.work?.url ? (
                    <Link isExternal href={profile.work?.url} color="teal.500">
                      {profile.work?.name || (
                        <chakra.span fontStyle="italic" color="gray.500">
                          Organization
                        </chakra.span>
                      )}
                    </Link>
                  ) : (
                    <span>
                      {profile.work?.name || (
                        <chakra.span fontStyle="italic" color="gray.500">
                          Organization
                        </chakra.span>
                      )}
                    </span>
                  )}
                </Text>
              </HStack>
            </Flex>

            <Flex>
              <HStack mr={5} spacing={2}>
                <Icon name="location" />
                <Text>
                  {profile.location || (
                    <chakra.span fontStyle="italic" color="gray.500">
                      Location
                    </chakra.span>
                  )}
                </Text>
              </HStack>

              {profile.country && (
                <Box mr={5}>
                  <Country code={profile.country} />
                </Box>
              )}
            </Flex>

            <Flex>
              <HStack mr={5} spacing={2}>
                <Icon name="link" />
                <Text>
                  {!profile.website_url && (
                    <chakra.span fontStyle="italic" color="gray.500">
                      example.com
                    </chakra.span>
                  )}
                  {profile.website_url && (
                    <Link
                      isExternal
                      href={profile.website_url}
                      fontWeight="500"
                      color="teal.500"
                    >
                      {trimUrl(profile.website_url)}
                    </Link>
                  )}
                </Text>
              </HStack>

              {profile.socials && <SocialLinks links={profile.socials} />}
            </Flex>

            <Flex>
              <Text fontSize="xs">
                Last updated {getCompleteDateTime(profile.updated_at)}
              </Text>
            </Flex>
          </Stack>
        </Box>

        {/* {isDev && <Text as="pre">{JSON.stringify(profile, null, 2)}</Text>} */}
      </Card>

      {profile?.handle && (
        <LinkButton
          size="sm"
          href={`/${profile.handle}`}
          colorScheme="teal"
          leftIcon={<Icon name="profile" />}
        >
          Check my profile
        </LinkButton>
      )}
    </Stack>
  )
}
