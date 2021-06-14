import NextHead from 'next/head'

import { Layout } from '@/layouts'
import { Content } from '@/components'
import { ProjectNew } from '@/components/projects'

export default function dashboardProjectsNewPage() {
  return (
    <Layout title="Write a new post · Catamyst">
      <NextHead>
        <title>Publish a project · Catamyst</title>
      </NextHead>

      <Content>
        <ProjectNew />
      </Content>
    </Layout>
  )
}
