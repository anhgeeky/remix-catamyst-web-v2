import { useState } from 'react'
import { Button, Input, Stack } from '@chakra-ui/react'

export default function QuickSignUpForm() {
  const [email, setEmail] = useState('')

  function handleChange(event) {
    setEmail(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (email) {
      alert(`Hey, let's sign up ${email}`)
    }
  }

  return (
    <Stack
      as="form"
      maxW="30rem"
      direction={['column', 'row']}
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        placeholder="yourname@mail.com"
        onChange={handleChange}
        value={email}
      />
      <Button type="submit" colorScheme="teal" px={10}>
        Get started
      </Button>
    </Stack>
  )
}
