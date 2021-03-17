import NextHead from 'next/head'
import NextImage from 'next/image'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import { Card, Content, HeadingStack } from '@components'
import { DashboardHero } from '@components/dashboard'

export function DashboardCertificates({ auth }) {
  return (
    <>
      <NextHead>
        <title>Certificates Dashboard · Catamyst</title>
      </NextHead>

      <DashboardHero>
        <Heading as="h1" size="xl">
          Certificates
        </Heading>
        <Text>Your attained certificates from Catamyst or from outside.</Text>
      </DashboardHero>

      <Content>
        <Stack spacing={5} width="100%">
          <Stack>
            <HeadingStack>From Catamyst:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you haven't got any certificates yet.
            </Card>
          </Stack>

          <Stack>
            <HeadingStack>From other place:</HeadingStack>
            <Card>
              Hey {auth.user.name}, you haven't add any outside certificates
              yet.
            </Card>
          </Stack>
        </Stack>
      </Content>
    </>
  )
}
