import NextHead from 'next/head'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { Card, Content, HeadingStack } from '@components'
import { CMSHero } from '@components/cms'

export default function CMSTracks() {
  return (
    <>
      <NextHead>
        <title>Tracks · CMS · Catamyst</title>
      </NextHead>
      <CMSHero>
        <Heading as="h1" size="xl">
          Tracks CMS
        </Heading>
        <Text>Available and hidden tracks.</Text>
      </CMSHero>
      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>Editable Tracks:</HeadingStack>
            <Card>Tracks list</Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
