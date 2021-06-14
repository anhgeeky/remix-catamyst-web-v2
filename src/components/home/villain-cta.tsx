import { Stack } from '@chakra-ui/react'

import { LinkButton, Icon } from '@/components'
import { useAuth } from '@/hooks'

export function HomeVillainCTA() {
  const { isAuthenticated } = useAuth()

  return (
    <Stack direction="column">
      {!isAuthenticated && (
        <>
          <LinkButton
            href="/learn"
            colorScheme="teal"
            leftIcon={<Icon name="learn" />}
          >
            Start learning for free
          </LinkButton>
          <LinkButton href="/signup" leftIcon={<Icon name="key" />}>
            Sign up for an account
          </LinkButton>
        </>
      )}
      {isAuthenticated && (
        <>
          <LinkButton
            href="/learn"
            colorScheme="teal"
            leftIcon={<Icon name="learn" />}
          >
            Continue learning
          </LinkButton>
          <LinkButton
            href="/dashboard/overview"
            leftIcon={<Icon name="overview" />}
          >
            Go to dashboard
          </LinkButton>
        </>
      )}
    </Stack>
  )
}
