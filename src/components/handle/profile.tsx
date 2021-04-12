import NextHead from 'next/head'
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

import { Icon, Content, LinkButton } from '@components'
import { UserProfile } from '@components/users'
import { OrganizationProfile } from '@components/organizations'
import { useProfileHandleSWR } from '@hooks'

/**
 * Fetch sequentially:
 * userData <- public.profiles
 * user <- users.json
 * orgData <- public.organizations
 * org <- organizations.json
 */
export function HandleProfile({ handle }) {
  const { data, isLoading, isError } = useProfileHandleSWR(handle)

  if (isLoading) {
    return <HandleLoading />
  }
  if (isError) {
    return <HandleNotFound handle={handle} />
  }
  if (data.type === 'user') {
    return <HandleUserProfile profile={data.profile} />
  }
  if (data.type === 'org') {
    return <HandleOrgProfile profile={data.profile} />
  }
  return <HandleNotFound handle={handle} />
}

export function HandleLoading() {
  return (
    <Flex justify="center" px={1}>
      <Box width="100%">
        <Skeleton
          maxW="1440px"
          height="200px"
          borderBottomLeftRadius="md"
          borderBottomRightRadius="md"
        />
        <Flex justify="center" px={5} mt="-90px">
          <Stack spacing={10} maxW={700} width="100%" align="center">
            <Box
              p={1}
              zIndex={1}
              rounded="full"
              bg={useColorModeValue('gray.50', 'gray.900')}
            >
              <Box as={SkeletonCircle} width={150} height={150} />
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  )
}

export function HandleNotFound({ handle }) {
  return (
    <>
      <Flex justify="center" px={1}>
        <Box width="100%">
          <Box
            height="200px"
            borderBottomLeftRadius="md"
            borderBottomRightRadius="md"
            bg={useColorModeValue('gray.200', 'gray.500')}
          />
          <Flex justify="center" px={5} mt="-90px">
            <Stack spacing={1} maxW={700} width="100%" align="center">
              <Box
                p={1}
                zIndex={1}
                rounded="full"
                bg={useColorModeValue('gray.50', 'gray.900')}
              >
                <Box
                  rounded="full"
                  width={150}
                  height={150}
                  bg={useColorModeValue('gray.200', 'gray.500')}
                />
              </Box>
              <VStack>
                <Heading as="h1" size="lg">
                  @{handle}
                </Heading>
                <Heading as="h2" size="sm">
                  This account doesn’t exist.
                </Heading>
                <Text>Try searching for another.</Text>
              </VStack>
              <Content display="flex" justifyContent="center">
                <ButtonGroup>
                  <LinkButton href="/" leftIcon={<Icon name="home" />}>
                    Back to Home
                  </LinkButton>
                  <LinkButton
                    href="/discover"
                    leftIcon={<Icon name="discover" />}
                  >
                    Back to Discover
                  </LinkButton>
                </ButtonGroup>
              </Content>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export function HandleUserProfile({ profile }) {
  return (
    <>
      <NextHead>
        <title>
          {profile.name} (@{profile.handle}) · Catamyst
        </title>
      </NextHead>
      <UserProfile user={profile} />
    </>
  )
}

export function HandleOrgProfile({ profile }) {
  return (
    <>
      <NextHead>
        <title>
          {profile.name} (@{profile.handle}) · Catamyst
        </title>
      </NextHead>
      <OrganizationProfile org={profile} />
    </>
  )
}
