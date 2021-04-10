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
import { useSWR, fetcherWithToken } from '@hooks'
import { getCompleteDateTime } from '@utils'
import { supabase } from '@lib'

export function CMSUsers() {
  const session = supabase.auth.session()
  const { data, error } = useSWR(
    ['/api/auth/users', session?.access_token],
    fetcherWithToken
  )

  const handleSearchItems = () => {
    /* Handle function */
  }

  if (error) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Users not found
        </Heading>
        <Text>Users are empty.</Text>
      </CMSHero>
    )
  }
  if (!data) {
    return (
      <CMSHero>
        <Heading as="h1" size="xl">
          Users CMS
        </Heading>
        <Text>Loading all users...</Text>
      </CMSHero>
    )
  }
  return (
    <>
      <NextHead>
        <title>Users CMS · Catamyst</title>
      </NextHead>

      <CMSHero>
        <Heading as="h1" size="xl">
          Users CMS
        </Heading>
        <Text>All {data.users?.length} users.</Text>
      </CMSHero>

      <Content>
        <CMSToolbar
          labels={{
            invite: 'Invite new user',
            search: 'Search for existing users',
          }}
          actions={{
            handleSearchItems,
          }}
        />

        <Stack
          divider={
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            />
          }
        >
          <HStack spacing={3} p={3} fontWeight="700">
            <Text flex={1}>ID</Text>
            <Text flex={2}>Email</Text>
            <Text flex={1}>Super admin?</Text>
            <Text flex={1}>Last sign in</Text>
            <Text flex={1}>Confirmed</Text>
            <Text flex={1}>Created</Text>
            <Text flex={1}>Updated</Text>
          </HStack>

          {data.users.map((user) => {
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
                    <Text flex={2}>{user.email}</Text>
                    <Text flex={1}>{JSON.stringify(user.is_super_admin)}</Text>
                    <Text flex={1}>
                      {getCompleteDateTime(user.last_sign_in_at)}
                    </Text>
                    <Text flex={1}>
                      {getCompleteDateTime(user.confirmed_at) || '-'}
                    </Text>
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
