import NextHead from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
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
  chakra,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { Content, Card, Country, Icon, SocialLinks } from '@components'
import {
  SettingsHero,
  UserNameForm,
  UserHandleForm,
  UserAvatarForm,
  UserCoverForm,
  UserPersonalForm,
  UserWorkForm,
  UserSocialsForm,
} from '@components/settings'
import { trimUrl } from '@utils'
import dataUsers from '@data/users.json'

export function SettingsProfile({ auth }) {
  const user = dataUsers.find((user) => user.id === auth.user.id)

  return (
    <>
      <NextHead>
        <title>Profile Settings · Catamyst</title>
      </NextHead>

      <SettingsHero>
        <Heading as="h1" size="xl">
          Profile Settings
        </Heading>
        <HStack>
          <Text>Edit your profile here. Make it good!</Text>
        </HStack>
      </SettingsHero>

      <Content>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align={{ lg: 'flex-start' }}
          spacing={5}
        >
          <UserProfilePreview user={user} />
          <Stack flex={1} spacing={5} maxW={760}>
            <UserNameForm user={user} />
            <UserHandleForm user={user} />
            <UserAvatarForm user={user} />
            <UserCoverForm user={user} />
            <UserPersonalForm user={user} />
            <UserWorkForm user={user} />
            <UserSocialsForm user={user} />
          </Stack>
        </Stack>
      </Content>
    </>
  )
}

export function UserProfilePreview({ user }) {
  const defaultCoverUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}/covers/grass.jpg`

  return (
    <Card id="preview" maxW={{ lg: '420px' }} width="100%" p={0}>
      <Box>
        <Flex justify="center">
          <Box
            className="next-image-container"
            width="100%"
            overflow="auto"
            borderTopRadius="md"
            bg={useColorModeValue('gray.100', 'gray.500')}
          >
            <NextImage
              alt={`Cover picture of ${user.name}`}
              src={user.coverUrl || defaultCoverUrl}
              layout="fixed"
              objectFit="cover"
              width={420}
              height={100}
            />
          </Box>
        </Flex>

        <Stack p={5}>
          <VStack spacing={1} mt="-75px">
            <Box
              rounded="full"
              p={1}
              zIndex={1}
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
              <Avatar name={user.name} src={user.avatarUrl} size="xl" />
            </Box>
            <Heading as="h2" size="lg">
              {user.name}
            </Heading>
            <Heading as="h3" size="sm" fontFamily="body">
              <NextLink href={`/${user.handle}`} passHref>
                <Link>@{user.handle}</Link>
              </NextLink>
            </Heading>
          </VStack>

          <Stack spacing={1} py={3} width="100%">
            {user.headline && (
              <Heading as="h4" size="sm" color="gray.500">
                {user.headline}
              </Heading>
            )}
            <Box>{ReactHtmlParser(user.bioHtml)}</Box>
          </Stack>

          <HStack spacing={1}>
            <Icon name="organization" />
            <span>
              {user.organization?.title || (
                <chakra.span fontStyle="italic" color="gray.500">
                  Title
                </chakra.span>
              )}
              ,{' '}
            </span>
            {user.organization?.handle ? (
              <NextLink href={user.organization?.handle} passHref>
                <Link color="teal.500">
                  {user.organization?.name || (
                    <chakra.span fontStyle="italic" color="gray.500">
                      Organization
                    </chakra.span>
                  )}
                </Link>
              </NextLink>
            ) : user.organization?.url ? (
              <Link isExternal href={user.organization?.url} color="teal.500">
                {user.organization?.name || (
                  <chakra.span fontStyle="italic" color="gray.500">
                    Organization
                  </chakra.span>
                )}
              </Link>
            ) : (
              <span>
                {user.organization?.name || (
                  <chakra.span fontStyle="italic" color="gray.500">
                    Organization
                  </chakra.span>
                )}
              </span>
            )}
          </HStack>

          <Flex>
            <Box mr={5}>
              <Country code={user.countryCode} />
            </Box>

            <HStack mr={5}>
              <Icon name="location" />
              <Text>
                {user.location || (
                  <chakra.span fontStyle="italic" color="gray.500">
                    Location Details
                  </chakra.span>
                )}
              </Text>
            </HStack>
          </Flex>

          <Flex>
            <HStack mr={5} spacing={1}>
              <Icon name="link" />
              <Link
                isExternal
                href={user.website.url}
                fontWeight="500"
                color="teal.500"
              >
                {trimUrl(user.website.url)}
              </Link>
            </HStack>

            <SocialLinks links={user.socials} />
          </Flex>
        </Stack>
      </Box>
    </Card>
  )
}
