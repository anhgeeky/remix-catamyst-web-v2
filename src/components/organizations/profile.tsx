import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  chakra,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  Badge,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { Country, Icon, SocialLinks, HeadingStack, useToast } from '@components'
import { OrganizationAvatar } from '@components/organizations'
import { transformOptions } from '@components/blocks'
import { trimUrl, getJoinedDate } from '@utils'
import { useAuth } from '@hooks'

import dataProjects from '@data/projects.json'

/**
 * Organization profile.
 * org.bio_html is the same format with BlockTexts.
 * Because there is only one Organization, the identification is using id.
 */
export function OrganizationProfile({ org }) {
  const toast = useToast()
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  const [isFollowed, setIsFollowed] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const isActionsAllowed = isAuthenticated
  const isSameUser = org.handle === auth?.org?.handle

  const hasCountry = Boolean(org.country)
  const hasLocation = Boolean(org.location)
  const hasSocialLinks = Boolean(org.socials?.length > 0)
  const hasWebsite = Boolean(org.website?.url)

  const handleFollow = () => {
    if (isActionsAllowed) {
      setIsFollowed(true)
      toast({ status: 'success', title: `Followed ${org.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleUnfollow = () => {
    if (isActionsAllowed) {
      setIsFollowed(false)
      toast({ status: 'warning', title: `Unfollowed ${org.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleFavorite = () => {
    if (isActionsAllowed) {
      setIsFavorited(true)
      toast({ title: `Favorited ${org.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleUnfavorite = () => {
    if (isActionsAllowed) {
      setIsFavorited(false)
      toast({ status: 'warning', title: `Unfavorited ${org.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleEditProfile = () => {
    router.push(`/settings/${org.handle}/profile`)
  }

  return (
    <>
      <OrganizationProfileCover org={org} />
      <OrganizationProfileContent
        org={org}
        state={{
          isSameUser,
          isFollowed,
          isFavorited,
          hasCountry,
          hasLocation,
          hasSocialLinks,
          hasWebsite,
        }}
        actions={{
          handleFollow,
          handleUnfollow,
          handleFavorite,
          handleUnfavorite,
          handleEditProfile,
        }}
      />
    </>
  )
}

function OrganizationProfileCover({ org }) {
  const defaultCoverUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}/covers/grass.jpg`

  return (
    <Flex justify="center" px={1}>
      <Box
        className="next-image-cover-container"
        maxW="1440px"
        overflow="auto"
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        bg={useColorModeValue('gray.100', 'gray.500')}
      >
        <NextImage
          alt={`Cover picture of ${org.name}`}
          src={org.coverUrl || defaultCoverUrl}
          layout="fixed"
          objectFit="cover"
          width={1440}
          height={200}
        />
      </Box>
    </Flex>
  )
}

function OrganizationProfileContent({ org, state, actions }) {
  const placeholder = {
    totalFollowing: 10,
    totalFollowers: 20,
    totalPosts: 3,
    totalProjects: 4,
    totalFavorites: 50,
    totalLikes: 60,
  }

  return (
    <Flex justify="center" mt={-90} px={5}>
      <Stack spacing={10} maxW={700} width="100%">
        <Stack id="org-profile" spacing={3}>
          <VStack id="org-info-0">
            <Box
              id="org-avatar"
              rounded="md"
              p={1}
              zIndex={1}
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
              <OrganizationAvatar org={org} />
            </Box>

            <OrganizationNameHandle org={org} />

            {/* Follow and favorite button */}
            {/* <Box id="org-actions" as={ButtonGroup} size="sm">
              {!state.isFollowed && (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={actions.handleFollow}
                >
                  Follow
                </Button>
              )}
              {state.isFollowed && (
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={actions.handleUnfollow}
                >
                  Unfollow
                </Button>
              )}
              {!state.isFavorited && (
                <IconButton
                  aria-label="Favorite organization"
                  colorScheme="teal"
                  variant="outline"
                  icon={<Icon name="star" />}
                  onClick={actions.handleFavorite}
                />
              )}
              {state.isFavorited && (
                <IconButton
                  aria-label="Unfavorite organization"
                  colorScheme="teal"
                  variant="solid"
                  icon={<Icon name="star" />}
                  onClick={actions.handleUnfavorite}
                />
              )}
            </Box> */}
          </VStack>

          <Stack id="org-info-1" spacing={0} pt={3}>
            {org.headline && (
              <Box id="org-headline">
                <Heading as="h3" size="md" color="gray.500">
                  {org.headline}
                </Heading>
              </Box>
            )}
            <Box id="org-bio">
              {!org.bio_html && <Text color="gray.500">No bio yet.</Text>}
              {org.bio_html && ReactHtmlParser(org.bio_html, transformOptions)}
            </Box>
          </Stack>

          <Flex id="org-info-2" color="gray.500" align="center" flexWrap="wrap">
            {state.hasCountry && (
              <Box id="org-country" mr={5}>
                <Country code={org.country} />
              </Box>
            )}

            {state.hasLocation && (
              <Box id="org-location" mr={5} as={HStack} spacing={1}>
                <Icon name="location" />
                <span>{org.location}</span>
              </Box>
            )}

            {state.hasWebsite && (
              <Box id="org-website" mr={5} as={HStack} spacing={1}>
                <Icon name="link" />
                <Link
                  isExternal
                  href={org.website.url}
                  fontWeight="500"
                  color="teal.500"
                >
                  {trimUrl(org.website.url)}
                </Link>
              </Box>
            )}

            {state.hasSocialLinks && (
              <Box id="org-social-links" mr={5} my={1}>
                <SocialLinks links={org.socials} />
              </Box>
            )}
          </Flex>

          <Flex id="org-info-3" color="gray.500" align="center" flexWrap="wrap">
            <Box id="org-following" mr={3} as={HStack} spacing={1}>
              <chakra.span fontWeight="700">
                {placeholder.totalFollowing}
              </chakra.span>
              <span>Following</span>
            </Box>

            <Box id="org-followers" mr={3} as={HStack} spacing={1}>
              <chakra.span fontWeight="700">
                {placeholder.totalFollowers}
              </chakra.span>
              <span>Followers</span>
            </Box>

            <Box id="org-posts" mr={3} as={HStack} spacing={1}>
              <chakra.span fontWeight="700">
                {placeholder.totalPosts}
              </chakra.span>
              <span>Posts</span>
            </Box>

            <Box id="org-projects" mr={3} as={HStack} spacing={1}>
              <chakra.span fontWeight="700">
                {placeholder.totalProjects}
              </chakra.span>
              <span>Projects</span>
            </Box>

            <Box id="org-favorites" mr={3} as={HStack} spacing={1}>
              <chakra.span fontWeight="700">
                {placeholder.totalFavorites}
              </chakra.span>
              <span>Favorites</span>
            </Box>

            <Box id="org-likes" mr={3} as={HStack} spacing={1}>
              <chakra.span fontWeight="700">
                {placeholder.totalLikes}
              </chakra.span>
              <span>Likes</span>
            </Box>
          </Flex>
        </Stack>

        {org.projects && (
          <Stack id="org-projects">
            <HeadingStack>Projects</HeadingStack>
            {org.projects.map((projectId, index) => {
              const project = dataProjects.find(
                (project) => project.id === projectId
              )
              return (
                <NextLink
                  key={index}
                  href={`/projects/${project.slug}`}
                  passHref
                >
                  <Link>{project.title}</Link>
                </NextLink>
              )
            })}
          </Stack>
        )}
      </Stack>
    </Flex>
  )
}

export function OrganizationNameHandle({ org }) {
  const isVerified = org.isVerified

  return (
    <Box id="org-name-handle" textAlign="center">
      <Flex id="org-name-verified" justify="center">
        <Heading id="org-name" as="h1" size="lg">
          {org.name}
        </Heading>

        {isVerified && (
          <Tooltip
            hasArrow
            label="Verified organization account"
            aria-label="Verified"
            placement="top"
          >
            <chakra.span
              fontSize="2xl"
              color="teal.500"
              position="relative"
              top="3px"
              ml={2}
            >
              <Icon name="verified" />
            </chakra.span>
          </Tooltip>
        )}
      </Flex>

      <HStack id="org-handle-details" justify="center">
        <Heading
          id="org-handle"
          as="h2"
          size="sm"
          color="gray.500"
          fontFamily="body"
          fontWeight="400"
        >
          @{org.handle}
        </Heading>
        <Badge variant="solid">{org.role}</Badge>
      </HStack>
    </Box>
  )
}
