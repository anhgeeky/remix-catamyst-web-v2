import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { CMSHero } from '@components/cms'

export default function CMSTopics() {
  return (
    <>
      <NextHead>
        <title>Topics · CMS · Catamyst</title>
      </NextHead>
      <CMSHero>
        <Heading as="h1" size="xl">
          Topics CMS
        </Heading>
        <Text>Available and hidden topics.</Text>
      </CMSHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Editable Topics:</HeadingStack>
            <Card>Topics list</Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
