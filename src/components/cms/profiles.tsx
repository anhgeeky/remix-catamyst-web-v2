import NextHead from 'next/head'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Heading,
  Code,
  HStack,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'

import { Content } from '@components'
import { CMSHero, CMSToolbar } from '@components/cms'
import { useSWR, fetcherSWR } from '@hooks'
import { getCompleteDateTime } from '@utils'
import { supabase } from '@lib'

export function CMSProfiles({ state }) {
  const { data, error } = useSWR(['/api/profiles'], fetcherSWR)

  const handleSearchItems = () => {
    /* Handle function */
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
            invite: 'Invite new user',
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
            <Text flex={1}>Name</Text>
            <Text flex={2}>Handle</Text>
            <Text flex={1}>Created</Text>
            <Text flex={1}>Updated</Text>
          </HStack>

          {data.users.map((user, index) => {
            return (
              <NextLink key={user.id} href={`/cms/users/${user.id}`} passHref>
                <a>
                  <HStack
                    spacing={3}
                    p={3}
                    rounded="md"
                    _hover={{ bg: useColorModeValue('teal.100', 'teal.900') }}
                  >
                    <Code flex={1}>{user.id}</Code>
                    <Text flex={1}>{user.avatar_url}</Text>
                    <Text flex={1}>{JSON.stringify(user.name)}</Text>
                    <Text flex={1}>{getCompleteDateTime(user.handle)}</Text>
                    <Text flex={1}>
                      {getCompleteDateTime(user.created_at) || '-'}
                    </Text>
                    <Text flex={1}>
                      {getCompleteDateTime(user.updated_at) || '-'}
                    </Text>
                  </HStack>
                </a>
              </NextLink>
            )
          })}
        </Stack>
      </Content>
    </>
  )
}
