import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  VisuallyHidden,
  FormLabel,
  Button,
  Input,
  Stack,
} from '@chakra-ui/react'

import { LinkButton } from '@components'
import { useAuth } from '@hooks'

export function HomeQuickForm() {
  const { isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const router = useRouter()

  function handleChange(event) {
    setEmail(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    /**
     * Temporarily instant sign in before sign up form is finished.
     */
    router.push('/signin')
  }

  return (
    <Stack
      id="quick-signup-form"
      as="form"
      maxW={{ base: '30rem', sm: '40rem' }}
      direction={{ base: 'column', sm: 'row' }}
      onSubmit={handleSubmit}
    >
      {!isAuthenticated && (
        <>
          <Box>
            <VisuallyHidden>
              <FormLabel>Email address</FormLabel>
            </VisuallyHidden>
            <Input
              type="email"
              placeholder="Enter your email..."
              onChange={handleChange}
              value={email}
              minW={{ base: 200, sm: 240, md: 340 }}
            />
          </Box>
          <Button type="submit" colorScheme="teal" px={5}>
            Start learning for free
          </Button>
        </>
      )}
      {isAuthenticated && (
        <>
          <LinkButton href="/dashboard" colorScheme="teal">
            Continue to dashboard
          </LinkButton>
        </>
      )}
    </Stack>
  )
}
