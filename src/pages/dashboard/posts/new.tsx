import NextHead from 'next/head'

import { Layout } from '@layouts'
import { Content } from '@components'
import { PostNew } from '@components/posts'

export default function dashboardPostsNewPage() {
  return (
    <Layout title="Write a new post · Catamyst">
      <NextHead>
        <title>Write a post · Catamyst</title>
      </NextHead>

      <Content>
        <PostNew />
      </Content>
    </Layout>
  )
}
