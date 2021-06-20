import NextHead from 'next/head'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Box,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Content } from '@/components'
import { CMSHero } from '@/components/cms'
import { useSWR, fetcherSWR } from '@/hooks'
import { trimId, getCompleteDateTime } from '@/utils'

export function CMSProfiles() {
  const { data, error } = useSWR(['/api/profiles'], fetcherSWR)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchItems = () => {
    /* Handle search function */
  }

  if (error) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Profiles not found
        </Heading>
        <Text>Profiles are empty.</Text>
      </CMSHero>
    )
  }
  if (!data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Profiles CMS
        </Heading>
        <Text>Loading all profiles...</Text>
      </CMSHero>
    )
  }
  return (
    <>
      <NextHead>
        <title>Profiles CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Profiles CMS
        </Heading>
        <Text>All {data.profiles?.length} users.</Text>
      </CMSHero>

      <Content>
        {/* <CMSToolbar
          labels={{
            invite: 'Invite new profile',
            search: 'Search for existing users',
          }}
          actions={{
            handleSearchItems,
          }}
        /> */}

        <Stack
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            />
          }
        >
          <HStack spacing={3} p={3} fontWeight="700">
            <Text flex={1}>ID</Text>
            <Text flex={1}>Avatar</Text>
            <Text flex={1}>Handle</Text>
            <Text flex={2}>Name</Text>
            <Text flex={1}>Nick</Text>
            <Text flex={2}>Created</Text>
            <Text flex={2}>Updated</Text>
          </HStack>

          {data.profiles.map((profile) => {
            return (
              <HStack
                key={profile.id}
                p={1}
                spacing={3}
                rounded="md"
                _hover={{ bg: useColorModeValue('teal.100', 'teal.900') }}
              >
                <Text flex={1} as="code" fontSize="xs" wordBreak="break-all">
                  {trimId(profile.id)}
                </Text>
                <Box flex={1} className="next-image-container">
                  {profile?.avatar_url && (
                    <NextImage
                      src={profile.avatar_url}
                      alt="Avatar"
                      aria-label={`Avatar of ${profile.name}`}
                      width={50}
                      height={50}
                      layout="fixed"
                    />
                  )}
                </Box>
                <Text flex={1}>
                  <NextLink href={`/${profile.handle}`} passHref>
                    <a>@{profile.handle}</a>
                  </NextLink>
                </Text>
                <Text flex={2}>{profile.name}</Text>
                <Text flex={1}>{profile.nickname}</Text>
                <Text flex={2}>
                  {getCompleteDateTime(profile.created_at) || '-'}
                </Text>
                <Text flex={2}>
                  {getCompleteDateTime(profile.updated_at) || '-'}
                </Text>
              </HStack>
            )
          })}
        </Stack>
      </Content>
    </>
  )
}
