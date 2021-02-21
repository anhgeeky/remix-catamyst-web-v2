import Head from 'next/head'
import { useRouter } from 'next/router'
import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '@/layouts'
import { Hero, Content, SectionLessons } from '@/components'
import dataTopics from '@/data/topics.json'

export default function Topic() {
  const router = useRouter()
  const { slug } = router.query

  const topic = dataTopics.find((topic) => {
    return topic.slug === slug
  })

  return (
    <Layout title={`Loading topic...`}>
      {slug && topic && (
        <>
          <Head>
            <title>{topic.title} · Catamyst</title>
          </Head>

          <Hero>
            <Heading as="h1" size="xl">
              {topic.iconEmoji} {topic.title}
            </Heading>
            <Text>{topic.description}</Text>
          </Hero>

          <Content>
            <SectionLessons data={topic.sections} />
          </Content>
        </>
      )}
    </Layout>
  )
}
