import { Stack } from '@chakra-ui/react'

import { LinkButton } from '@components'
import { useAuth } from '@hooks'

export function HomeCTA() {
  const { isAuthenticated } = useAuth()

  return (
    <Stack direction={{ base: 'column', sm: 'row' }}>
      {!isAuthenticated && (
        <>
          <LinkButton href="/learn" colorScheme="teal">
            Start learning for free
          </LinkButton>
          <LinkButton href="/signup" colorScheme="teal" variant="outline">
            Sign up for an account
          </LinkButton>
        </>
      )}
      {isAuthenticated && (
        <>
          <LinkButton href="/learn" colorScheme="teal">
            Continue learning
          </LinkButton>
          <LinkButton
            href="/dashboard/overview"
            colorScheme="teal"
            variant="outline"
          >
            Go to dashboard
          </LinkButton>
        </>
      )}
    </Stack>
  )
}