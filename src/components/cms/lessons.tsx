import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { CMSHero } from '@components/cms'

export default function CMSLessons() {
  return (
    <>
      <NextHead>
        <title>Lessons · CMS · Catamyst</title>
      </NextHead>
      <CMSHero>
        <Heading as="h1" size="xl">
          Lessons CMS
        </Heading>
        <Text>Available sections and lessons.</Text>
      </CMSHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Editable Lessons:</HeadingStack>
            <Card>Lessons list</Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
