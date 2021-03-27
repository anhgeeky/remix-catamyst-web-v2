import NextHead from 'next/head'
import { Heading, Text, VStack } from '@chakra-ui/react'

import { Icon } from '@components'
import { ForumHero } from '@components/forum'
import { dataForumSections } from '@data'

export function ForumSection({ sectionSlug }) {
  const section = dataForumSections.find(
    (section) => section.slug === sectionSlug
  )

  if (!section) {
    return (
      <>
        <NextHead>
          <title>Forum section not found · Catamyst</title>
        </NextHead>
        <Text>Sorry, forum section is not found.</Text>
      </>
    )
  }

  return (
    <>
      <NextHead>
        <title>{section.title} · Forum · Catamyst</title>
      </NextHead>

      <ForumHero section={section}>
        <VStack>
          <Text fontSize="3xl">
            <Icon name={section.icon ? section.icon : section.slug} />
          </Text>
          <Heading as="h1">{section.title}</Heading>
          <Text>{section.discussions.length} discussions</Text>
        </VStack>
      </ForumHero>
    </>
  )
}
