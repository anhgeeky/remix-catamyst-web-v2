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

import { Card, Country, Icon, SocialLinks } from '@components'
import { trimUrl, getCompleteDateTime } from '@utils'
import { supabase } from '@lib'
import { Profile } from '@types'

type State = { profile: Profile }
type Action = { type?: string; payload: any }

/**
 * Since we want this component to update in realtime,
 * we should use "useReducer" for sending Realtime events
 */
export const profileEventReducer = (state: State, action: Action) => {
  if (action.type === 'update') {
    return { profile: action.payload }
  } else if (action.type === 'set') {
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
    try {
      const subscription = supabase
        .from(`profiles:id=eq.${profile.id}`)
        .on('*', (payload) => {
          localDispatch({ type: 'update', payload: payload.new })
        })
        .subscribe()
      return () => {
        supabase.removeSubscription(subscription)
      }
    } catch (error) {
      console.error(`>>> ${error.message}`)
    }
  }, [])

  useEffect(() => {
    try {
      localDispatch({ type: 'set', payload: profile })
    } catch (error) {
      console.error(`>>> ${error.message}`)
    }
  }, [profile])

  if (!localState.profile) {
    return <div>Loading...</div>
  }
  return <ProfileCard profile={localState.profile} />
}

export default function ProfileCard({ profile }) {
  const [isTooSmall] = useMediaQuery('(max-width: 48em)')

  return (
    <Card
      className={`profile-preview ${!isTooSmall && 'sticky'}`}
      maxW={{ md: '420px' }}
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
          <VStack spacing={1} mt="-75px">
            <Box
              rounded="full"
              p={1}
              zIndex={1}
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
              <Avatar name={profile.name} src={profile?.avatar_url} size="xl" />
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

          <Stack spacing={1} py={3} width="100%">
            {profile.headline && (
              <Heading as="h4" size="sm" color="gray.500">
                {profile.headline}
              </Heading>
            )}
            <Box>{ReactHtmlParser(profile.bio_html)}</Box>
          </Stack>

          <HStack spacing={1}>
            <Icon name="organization" />
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
          </HStack>

          <Flex>
            {profile.country && (
              <Box mr={5}>
                <Country code={profile.country} />
              </Box>
            )}

            <HStack mr={5}>
              <Icon name="location" />
              <Text>
                {profile.location || (
                  <chakra.span fontStyle="italic" color="gray.500">
                    Location
                  </chakra.span>
                )}
              </Text>
            </HStack>
          </Flex>

          <Flex>
            <HStack mr={5} spacing={1}>
              <Icon name="link" />
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
            </HStack>

            {profile.socials && <SocialLinks links={profile.socials} />}
          </Flex>

          <Box>
            <Text fontSize="xs">
              Last updated {getCompleteDateTime(profile.updated_at)}
            </Text>
          </Box>
        </Stack>
      </Box>
    </Card>
  )
}
