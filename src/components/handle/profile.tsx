import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import NextHead from 'next/head'
import { Link, Heading, Text } from '@chakra-ui/react'

import { Hero } from '@components'
import { UserProfile } from '@components/users'
import { OrganizationProfile } from '@components/organizations'

import { supabase } from '@lib'
import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

/**
 * Fetch sequentially:
 * userData <- public.profiles
 * user <- users.json
 * orgData <- public.organizations
 * org <- organizations.json
 */
export function HandleProfile({ handle }) {
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState()
  const [orgProfile, setOrgProfile] = useState()

  useEffect(() => {
    searchProfile()
  }, [])

  const searchProfile = async () => {
    try {
      // public.profiles
      const { data: userData } = await supabase
        .from('profiles')
        .select(
          `handle, name, role, mode, plan, is_public, is_verified, avatar_url, cover_url, headline, bio_html, country, location, website_url, work, socials, created_at, updated_at`
        )
        .eq('handle', handle)
        .single()

      if (userData) {
        setUserProfile(userData)
        setLoading(false)
      }

      if (!userData) {
        // users.json
        const user = dataUsers.find((user) => user.handle === handle)
        if (user) {
          // @ts-ignore
          setUserProfile(user)
          setLoading(false)
        }

        if (!user) {
          // public.organizations
          const { data: orgData } = await supabase
            .from('organizations')
            .select(
              `handle, name, is_public, is_verified, logo_url, cover_url, headline, bio_html, country, location, website_url, socials, created_at, updated_at`
            )
            .eq('handle', handle)
            .single()

          if (orgData) {
            setOrgProfile(orgData)
            setLoading(false)
          }

          if (!orgData) {
            // organizations.json
            const org = dataOrganizations.find((org) => org.handle === handle)
            if (org) {
              // @ts-ignore
              setOrgProfile(org)
              setLoading(false)
            }

            if (!org) {
              setLoading(false)
            }
          }
        }
      }
    } catch (error) {
      console.error(error)
      setUserProfile(null)
      setOrgProfile(null)
      setLoading(false)
    }
  }

  return (
    <>
      {!loading && !userProfile && !orgProfile && (
        <Hero>
          <Heading as="h1" size="lg">
            @{handle}
          </Heading>
          <Text>This account doesn’t exist.</Text>
          <NextLink href="/discover" passHref>
            <Link color="teal.500">Go back to Discover</Link>
          </NextLink>
        </Hero>
      )}
      {!loading && userProfile && <HandleUserProfile profile={userProfile} />}
      {!loading && orgProfile && <HandleOrgProfile profile={orgProfile} />}
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
