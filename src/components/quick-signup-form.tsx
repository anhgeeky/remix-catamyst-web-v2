import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  VisuallyHidden,
  FormControl,
  FormLabel,
  Button,
  Input,
  Stack,
} from '@chakra-ui/react'

export default function QuickSignUpForm() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  function handleChange(event) {
    setEmail(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    router.push('/signup')
  }

  return (
    <Stack
      id="quick-signup-form"
      as="form"
      maxW="30rem"
      direction={['column', 'row']}
      onSubmit={handleSubmit}
    >
      <Box>
        <VisuallyHidden>
          <FormLabel>Email address</FormLabel>
        </VisuallyHidden>
        <Input
          type="email"
          placeholder="yourname@mail.com"
          onChange={handleChange}
          value={email}
          minW="280px"
        />
      </Box>
      <Button type="submit" colorScheme="teal" px={5}>
        Start learning
      </Button>
    </Stack>
  )
}
