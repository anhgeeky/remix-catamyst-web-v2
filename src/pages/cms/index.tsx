import { Heading, Stack, Text } from '@chakra-ui/react'
import { Layout } from '@layouts'
import { Card, ContentWithSidebar, HeadingStack, Hero } from '@components'
import { useRedirectSignIn } from '@hooks'

export default function CMS() {
  const { auth, isAuthorized } = useRedirectSignIn()

  return (
    <Layout title="Dashboard · Catamyst">
      {isAuthorized && (
        <>
          <Hero>
            <Heading as="h1" size="xl">
              CMS
            </Heading>
            <Text>Let's get editing!</Text>
          </Hero>
          <ContentWithSidebar>
            <Stack spacing={5} width="100%">
              <Stack>
                <HeadingStack>Heading</HeadingStack>
                <Card>Card</Card>
              </Stack>
              <Stack>
                <HeadingStack>Heading</HeadingStack>
                <Card>Card</Card>
              </Stack>
            </Stack>
          </ContentWithSidebar>
        </>
      )}
    </Layout>
  )
}
