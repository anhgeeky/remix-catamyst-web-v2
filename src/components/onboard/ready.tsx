import NextHead from 'next/head'
import NextImage from 'next/image'
import { ButtonGroup, Stack, Heading, Text } from '@chakra-ui/react'

import { Icon, LinkButton } from '@components'
import { OnboardContainer } from '@components/onboard'

export function OnboardReady({ state }) {
  return (
    <>
      <NextHead>
        <title>Congratulations! · Catamyst</title>
      </NextHead>

      <OnboardContainer>
        <Stack>
          <Heading
            as="h1"
            size="xl"
            bgClip="text"
            bgGradient="linear(to-r, teal.400, green.400)"
          >
            Congratulations!
          </Heading>
          <Text>You are ready to continue.</Text>
        </Stack>

        <Stack
          size="sm"
          colorScheme="blue"
          as={ButtonGroup}
          direction={{ base: 'column', sm: 'row' }}
        >
          <LinkButton href="/learn" leftIcon={<Icon name="learn" />}>
            Let's learn!
          </LinkButton>
          <LinkButton
            variant="outline"
            href="/dashboard/overview"
            leftIcon={<Icon name="dashboard" />}
          >
            Go to dashboard
          </LinkButton>
          <LinkButton
            variant="ghost"
            href="/onboard/mode"
            leftIcon={<Icon name="back" />}
          >
            Back
          </LinkButton>
        </Stack>
      </OnboardContainer>
    </>
  )
}
