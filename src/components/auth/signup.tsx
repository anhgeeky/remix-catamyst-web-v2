import { useState } from 'react'
import NextLink from 'next/link'
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

import { Icon } from '@/components'
import { SignUpSchema } from '@/utils/yup'
import { signUp } from '@/features/auth/actions'

export function AuthSignUp({ auth }) {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { errors, handleSubmit, register } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignUpSchema),
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSignUp = async (data) => {
    /**
     * Data will be passed as payload to signUp thunk
     */
    try {
      dispatch(signUp(data))
    } catch (error) {
      console.error('Failed to sign up.')
    }
  }

  return (
    <VStack>
      <Stack
        as="form"
        width="100%"
        maxW={360}
        spacing={5}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <FormControl id="name" isInvalid={errors.name} as={Stack} spacing={1}>
          <FormLabel>Your name</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="Your Full Name"
            ref={register}
            autoFocus
          />
          {errors.name && (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="email" as={Stack} spacing={1} isInvalid={errors.email}>
          <FormLabel>Your email</FormLabel>
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

        <FormControl
          id="password"
          as={Stack}
          spacing={1}
          isInvalid={errors.password}
        >
          <FormLabel>
            <HStack spacing={1}>
              <span>Your password</span>
              <HelpPasswordButton />
            </HStack>
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

          {errors.password ? (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Please use more than 10 characters</FormHelperText>
          )}
        </FormControl>

        <Button
          isDisabled={auth.isLoading}
          type="submit"
          colorScheme="teal"
          width="100%"
        >
          {auth.isLoading ? 'Creating account...' : 'Create my account'}
        </Button>

        <Stack fontSize="sm" opacity={0.75}>
          <Divider opacity={1} />
          <Text>
            Already have a Catamyst account?{' '}
            <NextLink href="/signin" passHref>
              <Link color="teal.500">Sign in</Link>
            </NextLink>
          </Text>
        </Stack>
      </Stack>
    </VStack>
  )
}

function HelpPasswordButton() {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton
          isRound
          variant="ghost"
          size="xs"
          aria-label="Help password"
          icon={<Icon name="help" />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Help for password</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody as={Stack} fontWeight="400">
          <Text>
            To manage your password, we recommend to use a free and secure
            password manager like{' '}
            <Link isExternal color="teal.500" href="https://bitwarden.com">
              Bitwarden
            </Link>
            .
          </Text>
          <Text>
            Also it's more safe to not use the same password for different
            sites.
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
