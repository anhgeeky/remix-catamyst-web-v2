import { useState } from 'react'
import NextLink from 'next/link'
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

import { SignInMagicSchema } from '@utils/yup'
import { signInMagic } from '@features/auth/actions'

export function AuthSignInMagic({ router }) {
  const dispatch = useDispatch()
  const { errors, handleSubmit, register } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignInMagicSchema),
  })

  const handleSignIn = async (data) => {
    /**
     * Data will be passed as payload to signIn thunk
     */
    try {
      await dispatch(signInMagic(data.email))
    } catch (error) {
      console.error('Failed to sign in.')
    }
  }

  return (
    <VStack>
      <Stack
        as="form"
        width="100%"
        maxW={360}
        spacing={5}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <FormControl id="email" as={Stack} spacing={1} isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="yourname@example.com"
            ref={register}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" colorScheme="teal" width="100%">
          Sign in
        </Button>

        <Stack fontSize="sm" opacity={0.75}>
          <Divider opacity={1} />
          <Text>
            Don't have an account?{' '}
            <NextLink href="/signup" passHref>
              <Link color="teal.500">Sign up</Link>
            </NextLink>
          </Text>
        </Stack>
      </Stack>
    </VStack>
  )
}
