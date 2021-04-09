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
import { UserAvatar } from '@components/users'
import { transformOptions } from '@components/blocks'
import { trimUrl, getJoinedDate } from '@utils'
import { useAuth } from '@hooks'

import dataProjects from '@data/projects.json'

/**
 * User profile.
 * user.bio_html is the same format with BlockTexts.
 * Because there is only one user, the identification is using id.
 */
export function UserProfile({ user }) {
  const toast = useToast()
  const router = useRouter()
  const { auth, isAuthenticated } = useAuth()

  const [isFollowed, setIsFollowed] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const isActionsAllowed = isAuthenticated
  const isSameUser = user.handle === auth?.profile?.handle

  const hasCountry = Boolean(user.country)
  const hasLocation = Boolean(user.location)
  const hasWork = user.work?.title && user.work?.name
  const hasSocialLinks = Boolean(user.socials?.length > 0)
  const hasWebsite = Boolean(user.website?.url)
  const hasProjects = Boolean(user.projects?.length)
  const joinedDate = getJoinedDate(user?.joinedAt)

  const handleFollow = () => {
    if (isActionsAllowed) {
      setIsFollowed(true)
      toast({ status: 'success', title: `Followed ${user.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleUnfollow = () => {
    if (isActionsAllowed) {
      setIsFollowed(false)
      toast({ status: 'warning', title: `Unfollowed ${user.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleFavorite = () => {
    if (isActionsAllowed) {
      setIsFavorited(true)
      toast({ title: `Favorited ${user.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleUnfavorite = () => {
    if (isActionsAllowed) {
      setIsFavorited(false)
      toast({ status: 'warning', title: `Unfavorited ${user.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleEditProfile = () => {
    router.push('/settings/profile')
  }

  return (
    <>
      <UserProfileCover user={user} />
      <UserProfileContent
        user={user}
        state={{
          isSameUser,
          isFollowed,
          isFavorited,
          hasCountry,
          hasLocation,
          hasWork,
          hasSocialLinks,
          hasWebsite,
          hasProjects,
          joinedDate,
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

function UserProfileCover({ user }) {
  const defaultCoverUrl = `https://storage.catamyst.com/covers/grass.jpg`

  return (
    <Flex justify="center" px={1}>
      <Flex
        className="next-image-cover-container"
        maxW="1440px"
        overflow="auto"
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        bg={useColorModeValue('gray.100', 'gray.500')}
      >
        <NextImage
          alt={`Cover picture of ${user.name}`}
          src={user.coverUrl || defaultCoverUrl}
          layout="fixed"
          objectFit="cover"
          width={1440}
          height={200}
        />
      </Flex>
    </Flex>
  )
}

function UserProfileContent({ user, state, actions }) {
  const placeholder = {
    totalFollowing: 10,
    totalFollowers: 20,
    totalPosts: 3,
    totalProjects: 4,
    totalFavorites: 50,
    totalLikes: 60,
  }

  return (
    <Flex justify="center" mt="-90px" px={5}>
      <Stack spacing={10} maxW={700} width="100%">
        <Stack id="user-profile" spacing={3}>
          <VStack id="user-info-names">
            <Box
              id="user-avatar"
              p={1}
              zIndex={1}
              rounded="full"
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
              <UserAvatar user={user} size={150} />
            </Box>

            <UserNameHandle user={user} />

            <Box id="user-actions" as={ButtonGroup} size="sm">
              {state.isSameUser && (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={actions.handleEditProfile}
                >
                  Edit profile
                </Button>
              )}
              {/* <ProfileActions state={state} actions={actions} /> */}
            </Box>
          </VStack>

          <Stack id="user-info-bio" spacing={0} pt={3}>
            {user.headline && (
              <Box id="user-headline">
                <Heading as="h3" size="md" color="gray.500">
                  {user.headline}
                </Heading>
              </Box>
            )}
            <Box id="user-bio">
              {!user.bio_html && <Text color="gray.500">No bio yet.</Text>}
              {user.bio_html &&
                ReactHtmlParser(user.bio_html, transformOptions)}
            </Box>
          </Stack>

          <Flex
            id="user-info-work"
            color="gray.500"
            align="center"
            flexWrap="wrap"
          >
            {state.hasWork && (
              <Box id="user-organization" mr={5} as={HStack} spacing={1}>
                <Icon name="organization" />
                <span>{user.work.title}, </span>
                {user.work.handle ? (
                  <NextLink href={user.work.handle} passHref>
                    <Link color="teal.500">{user.work.name}</Link>
                  </NextLink>
                ) : user.work.url ? (
                  <Link isExternal href={user.work.url} color="teal.500">
                    {user.work.name}
                  </Link>
                ) : (
                  <span>{user.work.name}</span>
                )}
              </Box>
            )}

            {state.hasCountry && (
              <Box id="user-country" mr={5}>
                <Country code={user.country} />
              </Box>
            )}

            {state.hasLocation && (
              <Box id="user-location" mr={5} as={HStack} spacing={1}>
                <Icon name="location" />
                <span>{user.location}</span>
              </Box>
            )}
          </Flex>

          <Flex
            id="user-info-links"
            color="gray.500"
            align="center"
            flexWrap="wrap"
          >
            {state.hasWebsite && (
              <Box id="user-website" mr={5} as={HStack} spacing={1}>
                <Icon name="link" />
                <Link
                  isExternal
                  href={user.website.url}
                  fontWeight="500"
                  color="teal.500"
                >
                  {trimUrl(user.website.url)}
                </Link>
              </Box>
            )}

            {state.hasSocialLinks && (
              <Box id="user-social-links" mr={5} my={1}>
                <SocialLinks links={user.socials} />
              </Box>
            )}

            <Box id="user-join-date" mr={5} as={HStack} spacing={1}>
              <Icon name="date" />
              <span>Joined {state.joinedDate}</span>
            </Box>
          </Flex>

          {/* <ProfileInfoStats /> */}
        </Stack>

        {state.hasProjects && (
          <Stack id="org-projects">
            <HeadingStack>Projects</HeadingStack>
            {user.projects.map((projectId, index) => {
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

export function UserNameHandle({ user }) {
  return (
    <Box id="user-name-handle" textAlign="center">
      <Flex id="user-name-verified" justify="center">
        <Heading id="user-name" as="h1" size="lg">
          {user.name}
        </Heading>

        {user?.is_verified && (
          <Tooltip
            hasArrow
            label="Verified user account"
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

      <VStack id="user-handle-role-plan" justify="center">
        <Heading
          id="user-handle"
          as="h2"
          size="sm"
          color="gray.500"
          fontFamily="body"
          fontWeight="400"
        >
          {user.handle ? `@${user.handle}` : '@username'}
        </Heading>
        <HStack>
          {user.role && user.role !== 'Member' && (
            <Badge variant="solid">{user.role}</Badge>
          )}
          {user.mode && <Badge variant="solid">{user.mode}</Badge>}
          {user.plan && user.plan !== 'Basic' && (
            <Badge variant="solid">{user.plan}</Badge>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

export function ProfileActions({ state, actions }) {
  return (
    <Box id="org-actions" as={ButtonGroup} size="sm">
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
    </Box>
  )
}

export function ProfileInfoStats({ data = {} }) {
  const placeholder = {
    totalFollowing: 10,
    totalFollowers: 20,
    totalPosts: 3,
    totalProjects: 4,
    totalFavorites: 50,
    totalLikes: 60,
  }

  return (
    <Flex id="org-info-stats" color="gray.500" align="center" flexWrap="wrap">
      <Box id="org-following" mr={3} as={HStack} spacing={1}>
        <chakra.span fontWeight="700">{placeholder.totalFollowing}</chakra.span>
        <span>Following</span>
      </Box>

      <Box id="org-followers" mr={3} as={HStack} spacing={1}>
        <chakra.span fontWeight="700">{placeholder.totalFollowers}</chakra.span>
        <span>Followers</span>
      </Box>

      <Box id="org-posts" mr={3} as={HStack} spacing={1}>
        <chakra.span fontWeight="700">{placeholder.totalPosts}</chakra.span>
        <span>Posts</span>
      </Box>

      <Box id="org-projects" mr={3} as={HStack} spacing={1}>
        <chakra.span fontWeight="700">{placeholder.totalProjects}</chakra.span>
        <span>Projects</span>
      </Box>

      <Box id="org-favorites" mr={3} as={HStack} spacing={1}>
        <chakra.span fontWeight="700">{placeholder.totalFavorites}</chakra.span>
        <span>Favorites</span>
      </Box>

      <Box id="org-likes" mr={3} as={HStack} spacing={1}>
        <chakra.span fontWeight="700">{placeholder.totalLikes}</chakra.span>
        <span>Likes</span>
      </Box>
    </Flex>
  )
}
