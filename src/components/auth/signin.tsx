import { useState } from 'react'
import NextLink from 'next/link'
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

import { SignInSchema } from '@utils/yup'
import { signIn } from '@features/auth/actions'

export function AuthSignIn({ auth }) {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { errors, handleSubmit, register } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignInSchema),
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSignIn = async (data) => {
    /**
     * Data will be passed as payload to signIn thunk
     */
    try {
      await dispatch(signIn(data))
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
            autoFocus
          />
          {errors.email && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          id="password"
          as={Stack}
          spacing={1}
          isInvalid={errors.password}
        >
          <FormLabel>
            <span>Password</span>
          </FormLabel>
          <InputGroup>
            <Input
              name="password"
              placeholder="Enter password"
              pr="4rem"
              type={showPassword ? 'text' : 'password'}
              ref={register}
            />
            <InputRightElement width="4rem">
              <Button size="xs" onClick={handleShowPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          {errors.password && (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          isDisabled={auth.isLoading}
          type="submit"
          colorScheme="teal"
          width="100%"
        >
          {auth.isLoading ? 'Signing in...' : 'Sign in'}
        </Button>

        <Stack fontSize="sm" opacity={0.75}>
          <Divider opacity={1} />
          <Text>
            Don't have an account?{' '}
            <NextLink href="/signup" passHref>
              <Link color="teal.500">Sign up</Link>
            </NextLink>
          </Text>
          <Text>
            Forgot password?{' '}
            <NextLink href="/recover" passHref>
              <Link color="teal.500">Recover here</Link>
            </NextLink>
          </Text>
        </Stack>
      </Stack>
    </VStack>
  )
}
