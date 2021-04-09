import NextLink from 'next/link'
import { Box, Text, Input, Button, Link, Stack, VStack } from '@chakra-ui/react'

export function AuthRecoverPassword() {
  return (
    <VStack>
      <Stack
        as="form"
        width="100%"
        maxW={360}
        spacing={5}
        // onSubmit={handleSubmit(handleSignUp)}
      >
        <Text>
          Enter your email and we will send you instructions to setup a new
          password.
        </Text>

        <Stack>
          <Input placeholder="yourname@example.com" />
          <Button
            // isDisabled={auth.isLoading}
            type="submit"
            colorScheme="teal"
            width="100%"
          >
            {/* {auth.isLoading ? 'Sending...' : 'Send instruction'} */}
            Send instructions
          </Button>
          <Text>This will send a password reset link to your email.</Text>
        </Stack>

        <VStack>
          <NextLink href="/signin" passHref>
            <Link color="teal.500">Back to sign in</Link>
          </NextLink>
        </VStack>
      </Stack>
    </VStack>
  )
}
