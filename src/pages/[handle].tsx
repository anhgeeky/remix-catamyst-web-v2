import NextLink from 'next/link'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { Link } from '@chakra-ui/react'

import { Layout } from '@layouts'
import { UserProfile } from '@components/user'
import { OrganizationProfile } from '@components/organizations'

import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

/**
 * Handle page can check either for User or Organization.
 */
export default function handlePage() {
  const router = useRouter()
  const { handle } = router.query

  const user = dataUsers.find((user) => user.handle === handle)
  const org = dataOrganizations.find((org) => org.handle === handle)

  return (
    <Layout title="Catamyst">
      {!user && !org && (
        <div>
          <h1>@{handle}</h1>
          <p>This account doesn’t exist.</p>
          <NextLink href="/discover" passHref>
            <Link color="teal.500">Go back to Discover</Link>
          </NextLink>
        </div>
      )}
      {user && (
        <>
          <NextHead>
            <title>
              {user.name} (@{user.handle}) · Catamyst
            </title>
          </NextHead>

          <UserProfile user={user} />
        </>
      )}
      {org && (
        <>
          <NextHead>
            <title>
              {org.name} (@{org.handle}) · Catamyst
            </title>
          </NextHead>

          <OrganizationProfile org={org} />
        </>
      )}
    </Layout>
  )
}
