import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { UserProfile } from '@components/users'
import { OrganizationProfile } from '@components/organizations'

import { supabase } from '@lib'
import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

export function HandleProfile({ handle }) {
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState()
  const [orgProfile, setOrgProfile] = useState()

  useEffect(() => {
    getUserProfile()
    getOrgProfile()
  }, [])

  const getUserProfile = async () => {
    try {
      // Search from profiles first
      const { data, error } = await supabase
        .from('profiles')
        .select(
          `handle, name, role, mode, plan, is_public, is_verified, avatar_url, cover_url, headline, bio_html, country, location, website_url, work, socials, created_at, updated_at`
        )
        .eq('handle', handle)
        .single()
      if (!data) {
        // Search from JSON as backup
        const user = dataUsers.find((user) => user.handle === handle)
        if (user) {
          // @ts-ignore
          setUserProfile(user)
          setLoading(false)
        }
      }
      if (data) {
        setUserProfile(data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setUserProfile(null)
      setLoading(false)
    }
  }

  const getOrgProfile = async () => {
    try {
      // Search from organizations second
      const { data, error } = await supabase
        .from('organizations')
        .select(
          `handle, name, is_public, is_verified, logo_url, cover_url, headline, bio_html, country, location, website_url, socials, created_at, updated_at`
        )
        .eq('handle', handle)
        .single()
      if (!data) {
        // Search from JSON as backup
        const org = dataOrganizations.find((org) => org.handle === handle)
        if (org) {
          // @ts-ignore
          setOrgProfile(org)
          setLoading(false)
        }
      } else if (data) {
        setOrgProfile(data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setUserProfile(null)
      setLoading(false)
    }
  }

  return (
    <>
      {!loading && !userProfile && !orgProfile && (
        <div>
          <h1>@{handle}</h1>
          <p>This account doesn’t exist.</p>
          <NextLink href="/discover" passHref>
            <Link color="teal.500">Go back to Discover</Link>
          </NextLink>
        </div>
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
