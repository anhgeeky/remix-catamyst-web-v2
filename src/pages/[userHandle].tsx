import NextHead from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '@layouts'
import { UserProfile } from '@components/user'
import dataUsers from '@data/users.json'

export default function userHandlePage() {
  const router = useRouter()
  const { userHandle } = router.query
  const user = dataUsers.find((user) => user.handle === userHandle)

  return (
    <Layout title="Catamyst">
      {!user && (
        <div>
          <h1>@{userHandle}</h1>
          <p>This account doesn’t exist.</p>
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
    </Layout>
  )
}
