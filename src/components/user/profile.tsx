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
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'
import { useSelector, useDispatch } from 'react-redux'

import { Country, Icon, SocialLinks, useToast } from '@components'
import { transformOptions } from '@components/blocks'
import { trimUrl } from '@utils'

/**
 * User profile.
 * user.bioHtml is the same format with BlockTexts.
 */
export function UserProfile({ user }) {
  const toast = useToast()
  const auth = useSelector((state) => state.auth)
  const isSameUser = user.handle === auth?.user?.handle
  const isFollowed = false

  const handleFollow = () => {
    toast({ status: 'success', title: `Followed ${user.name}` })
  }

  const handleUnfollow = () => {
    toast({ status: 'warning', title: `Unfollowed ${user.name}` })
  }

  const handleFavorite = () => {
    toast({ title: `Favorited ${user.name}` })
  }

  return (
    <>
      <UserProfileCover user={user} />
      <UserProfileContent
        user={user}
        state={{
          isSameUser,
          isFollowed,
        }}
        actions={{
          handleFollow,
          handleUnfollow,
          handleFavorite,
        }}
      />
    </>
  )
}

function UserProfileCover({ user }) {
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
          alt={`Cover picture of ${user.name}`}
          src={user.coverUrl || defaultCoverUrl}
          layout="fixed"
          objectFit="cover"
          width={1440}
          height={200}
        />
      </Box>
    </Flex>
  )
}

function UserProfileContent({ user, state, actions }) {
  const hasCountry = Boolean(user.countryCode)
  const hasLocation = Boolean(user.location)
  const hasOrganization = user.organization?.title && user.organization?.name
  const joinDate = 'January 2020'
  const hasWebsite = Boolean(user.website?.url)
  const hasSocialLinks = Boolean(user.socials?.length > 0)

  const placeholder = {
    totalFollowing: 10,
    totalFollowers: 20,
    totalPosts: 3,
    totalProjects: 4,
    totalFavorites: 50,
    totalLikes: 60,
  }

  return (
    <Flex justify="center" mt={-90}>
      <Stack p={5} spacing={3} maxW="760px" width="100%">
        <VStack id="user-names">
          <Box
            id="user-avatar"
            rounded="full"
            p={1}
            zIndex={1}
            bg={useColorModeValue('gray.50', 'gray.900')}
          >
            <Avatar name={user.name} src={user.avatarUrl} size="2xl" />
          </Box>

          <Box id="user-name-handle" textAlign="center">
            <Heading id="user-name" as="h1" size="lg">
              {user.name}
            </Heading>
            <Heading
              id="user-handle"
              as="h2"
              size="sm"
              color="gray.500"
              fontFamily="body"
              fontWeight="400"
            >
              @{user.handle}
            </Heading>
          </Box>

          <Box id="user-actions" as={ButtonGroup} size="sm">
            {state.isSameUser && (
              <Button colorScheme="teal" variant="outline">
                This is you
              </Button>
            )}
            {!state.isSameUser && !state.isFollowed && (
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={actions.handleFollow}
              >
                Follow
              </Button>
            )}
            {!state.isSameUser && state.isFollowed && (
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={actions.handleUnfollow}
              >
                Following
              </Button>
            )}
            {!state.isSameUser && (
              <IconButton
                aria-label="Favorite user"
                colorScheme="teal"
                variant="outline"
                icon={<Icon name="favorite" />}
                onClick={actions.handleFavorite}
              >
                Icon
              </IconButton>
            )}
          </Box>
        </VStack>

        <Stack id="user-info-1" spacing={0}>
          {user.headline && (
            <Box id="user-headline">
              <Heading as="h3" size="md" color="gray.500">
                {user.headline}
              </Heading>
            </Box>
          )}
          <Box id="user-bio">
            {ReactHtmlParser(user.bioHtml, transformOptions)}
          </Box>
        </Stack>

        <Flex id="user-info-2" color="gray.500" align="center" flexWrap="wrap">
          {hasOrganization && (
            <Box id="user-organization" mr={5} as={HStack} spacing={1}>
              <Icon name="organization" />
              <span>{user.organization.title}, </span>
              <span>{user.organization.name}</span>
            </Box>
          )}

          {hasCountry && (
            <Box id="user-country" mr={5}>
              <Country code={user.countryCode} />
            </Box>
          )}

          {hasLocation && (
            <Box id="user-location" mr={5} as={HStack} spacing={1}>
              <Icon name="location" />
              <span>{user.location}</span>
            </Box>
          )}
        </Flex>

        <Flex id="user-info-3" color="gray.500" align="center" flexWrap="wrap">
          {hasWebsite && (
            <Box id="user-website" mr={5}>
              <Link
                isExternal
                href={user.website.url}
                as={HStack}
                spacing={1}
                fontWeight="500"
              >
                <Icon name="link" />
                <chakra.span color="teal.500">
                  {trimUrl(user.website.url)}
                </chakra.span>
              </Link>
            </Box>
          )}

          {hasSocialLinks && (
            <Box id="user-social-links" mr={5}>
              <SocialLinks links={user.socials} />
            </Box>
          )}

          <Box id="user-join-date" mr={5} as={HStack} spacing={1}>
            <Icon name="date" />
            <span>Joined {joinDate}</span>
          </Box>
        </Flex>

        <Flex id="user-info-4" color="gray.500" align="center" flexWrap="wrap">
          <Box id="user-following" mr={5} as={HStack} spacing={1}>
            <chakra.span fontWeight="700">
              {placeholder.totalFollowing}
            </chakra.span>
            <span>Following</span>
          </Box>

          <Box id="user-followers" mr={5} as={HStack} spacing={1}>
            <chakra.span fontWeight="700">
              {placeholder.totalFollowers}
            </chakra.span>
            <span>Followers</span>
          </Box>

          <Box id="user-posts" mr={5} as={HStack} spacing={1}>
            <chakra.span fontWeight="700">{placeholder.totalPosts}</chakra.span>
            <span>Posts</span>
          </Box>

          <Box id="user-projects" mr={5} as={HStack} spacing={1}>
            <chakra.span fontWeight="700">
              {placeholder.totalProjects}
            </chakra.span>
            <span>Projects</span>
          </Box>

          <Box id="user-favorites" mr={5} as={HStack} spacing={1}>
            <chakra.span fontWeight="700">
              {placeholder.totalFavorites}
            </chakra.span>
            <span>Favorites</span>
          </Box>

          <Box id="user-likes" mr={5} as={HStack} spacing={1}>
            <chakra.span fontWeight="700">{placeholder.totalLikes}</chakra.span>
            <span>Likes</span>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  )
}
