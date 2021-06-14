import { useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  chakra,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
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
import { useProfile } from '@hooks'
import { dataProjects } from '@data'

/**
 * User profile details.
 * profile.bio_html is the same format with BlockTexts.
 * Because there is only one user, the identification is using id.
 */
export function UserProfile({ profile }) {
  const toast = useToast()
  const router = useRouter()
  const { handle } = router.query
  const globalState = useProfile()

  const [isFollowed, setIsFollowed] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const isActionsAllowed = globalState.isAuthenticated
  const isSameUser = globalState?.profile?.handle === handle

  const hasCountry = Boolean(profile.country)
  const hasLocation = Boolean(profile.location)
  const hasProjects = Boolean(profile.projects?.length)
  const hasSocialLinks = Boolean(profile.socials?.length > 0)
  const hasWebsite = Boolean(profile.website?.url)
  const hasWork = profile.work?.title && profile.work?.name
  const joinedDate = getJoinedDate(profile?.created_at)

  const handleFollow = () => {
    if (isActionsAllowed) {
      setIsFollowed(true)
      toast({ status: 'success', title: `Followed ${profile.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleUnfollow = () => {
    if (isActionsAllowed) {
      setIsFollowed(false)
      toast({ status: 'warning', title: `Unfollowed ${profile.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleFavorite = () => {
    if (isActionsAllowed) {
      setIsFavorited(true)
      toast({ title: `Favorited ${profile.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleUnfavorite = () => {
    if (isActionsAllowed) {
      setIsFavorited(false)
      toast({ status: 'warning', title: `Unfavorited ${profile.name}` })
    } else {
      router.push('/signin')
    }
  }

  const handleEditProfile = () => {
    router.push('/settings/profile')
  }

  return (
    <>
      <UserProfileCover profile={profile} />
      <UserProfileContent
        profile={profile}
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

function UserProfileCover({ profile }) {
  const defaultCoverUrl = `https://storage.catamyst.com/covers/grass.jpg`

  return (
    <Flex justify="center" px={1}>
      <Flex
        className="next-image-cover-container"
        maxW="1440px"
        overflow="auto"
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        bg={useColorModeValue('gray.200', 'gray.500')}
      >
        <NextImage
          alt={`Cover picture of ${profile.name}`}
          src={profile.cover_url || defaultCoverUrl}
          layout="fixed"
          objectFit="cover"
          width={1440}
          height={200}
        />
      </Flex>
    </Flex>
  )
}

function UserProfileContent({ profile, state, actions }) {
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
              <UserAvatar profile={profile} size={150} />
            </Box>

            <UserNameHandle profile={profile} />

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
            {profile.headline && (
              <Box id="user-headline">
                <Heading as="h3" size="md" color="gray.500">
                  {profile.headline}
                </Heading>
              </Box>
            )}
            <Box id="user-bio" fontSize={['md', 'lg']} pt={2} pb={2}>
              {!profile.bio_html && <Text color="gray.500">No bio yet.</Text>}
              {profile.bio_html &&
                ReactHtmlParser(profile.bio_html, transformOptions)}
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
                <span>{profile.work.title}, </span>
                {profile.work.handle ? (
                  <NextLink href={`/${profile.work.handle}`} passHref>
                    <Link color="teal.500">{profile.work.name}</Link>
                  </NextLink>
                ) : profile.work.url ? (
                  <Link isExternal href={profile.work.url} color="teal.500">
                    {profile.work.name}
                  </Link>
                ) : (
                  <span>{profile.work.name}</span>
                )}
              </Box>
            )}

            {state.hasCountry && (
              <Box id="user-country" mr={5}>
                <Country code={profile.country} />
              </Box>
            )}

            {state.hasLocation && (
              <Box id="user-location" mr={5} as={HStack} spacing={1}>
                <Icon name="location" />
                <span>{profile.location}</span>
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
                  href={profile.website.url}
                  fontWeight="500"
                  color="teal.500"
                >
                  {trimUrl(profile.website.url)}
                </Link>
              </Box>
            )}

            {state.hasSocialLinks && (
              <Box id="user-social-links" mr={5} my={1}>
                <SocialLinks links={profile.socials} />
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
            {profile.projects.map((projectId, index) => {
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

export function UserNameHandle({ profile }) {
  return (
    <Box id="user-name-handle" textAlign="center">
      <Flex id="user-name-verified" justify="center">
        <Heading id="user-name" as="h1" size="lg">
          {profile.name}
        </Heading>

        {profile?.is_verified && (
          <Tooltip
            hasArrow
            label="Verified user"
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
          {profile.handle ? `@${profile.handle}` : '@username'}
        </Heading>
        <HStack>
          {profile.role && profile.role !== 'Member' && (
            <Badge variant="solid">{profile.role}</Badge>
          )}
          {profile.mode && <Badge variant="solid">{profile.mode}</Badge>}
          {profile.plan && profile.plan !== 'Basic' && (
            <Badge variant="solid">{profile.plan}</Badge>
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

export function ProfileInfoStats() {
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
