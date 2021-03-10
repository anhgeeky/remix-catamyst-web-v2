import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@layouts'
import { useAuth } from '@hooks'

export default function CMS() {
  const router = useRouter()
  const { auth, isAuthorized } = useAuth()

  useEffect(() => {
    if (isAuthorized) router.replace('/cms/stats')
    else router.replace('/signin')
  }, [isAuthorized])

  return <Layout>{auth.isLoading && <p>Loading...</p>}</Layout>
}

/**
 * The CMS might have different pattern with regular dashboard
 * `/cms/[cmsSlug]` to handle tabs and index of collections
 * `/cms/tracks/[trackId]` to handle editing the track by id
 * `/cms/topics/[topicId]` to handle editing the topic by id
 * `/cms/lessons/[trackId]` to handle editing the lesson by id
 */