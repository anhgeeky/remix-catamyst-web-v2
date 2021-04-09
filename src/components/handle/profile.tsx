import { useState, useEffect } from 'react'
import NextHead from 'next/head'
import { Box, Heading, Text, ButtonGroup } from '@chakra-ui/react'
import useSWR from 'swr'

import { Hero, Content, LinkButton } from '@components'
import { UserProfile } from '@components/users'
import { OrganizationProfile } from '@components/organizations'
import { fetcher } from '@utils'

/**
 * Fetch sequentially:
 * userData <- public.profiles
 * user <- users.json
 * orgData <- public.organizations
 * org <- organizations.json
 */
export function HandleProfile({ handle }) {
  const { data, error } = useSWR(`/api/${handle}`, fetcher)

  if (error) {
    return <HandleNotFound handle={handle} />
  }
  if (!data) {
    return <Text>Loading profile...</Text>
  }
  if (data) {
    return (
      <>
        {data.type === 'user' && <HandleUserProfile profile={data.profile} />}
        {data.type === 'org' && <HandleOrgProfile profile={data.profile} />}
      </>
    )
  }
}

export function HandleNotFound({ handle }) {
  return (
    <>
      <Hero>
        <Heading as="h1" size="lg">
          @{handle}
        </Heading>
        <Box mt={5}>
          <Heading as="h2" size="sm">
            This account doesn’t exist.
          </Heading>
          <Text>Try searching for another.</Text>
        </Box>
      </Hero>
      <Content display="flex" justifyContent="center">
        <ButtonGroup>
          <LinkButton href="/">Back to Home</LinkButton>
          <LinkButton href="/discover">Back to Discover</LinkButton>
        </ButtonGroup>
      </Content>
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
