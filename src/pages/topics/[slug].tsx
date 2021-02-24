import Head from 'next/head'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content, SectionLessons } from '@/components'
import dataTopics from '@/data/topics.json'

export default function TopicBySlug() {
  const router = useRouter()
  const { slug } = router.query

  const topic = dataTopics.find((topic) => {
    if (topic.slug) {
      return slug === topic.slug
    } else {
      return slug === slugify(topic.title, { lower: true })
    }
  })

  return (
    <Layout title={`Loading topic...`}>
      {slug && topic && (
        <>
          <Head>
            <title>{topic.title} · Topic · Catamyst</title>
          </Head>

          <Hero>
            <Heading as="h1" size="xl">
              {topic.iconEmoji} {topic.title}
            </Heading>
            <Text>{topic.description}</Text>
          </Hero>

          <Content>
            {topic.sections && <SectionLessons data={topic.sections} />}
          </Content>
        </>
      )}
    </Layout>
  )
}
