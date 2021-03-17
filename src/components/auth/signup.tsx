import { useState } from 'react'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
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
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Icon, useToast } from '@components'
import { SignUpSchema } from '@utils/yup'

export function AuthSignUp({ router }) {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    errors,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(SignUpSchema),
  })

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSignUp = (data) => {
    // data will be passed as payload to signUp thunk
    try {
      // dispatch(signUp())
      toast({
        status: 'success',
        title: 'Sign up success!',
        description: 'Welcome onboard.',
      })
      router.replace('/dashboard/overview')
    } catch (error) {
      toast({
        status: 'error',
        title: 'Failed to sign up!',
        description: 'Please try again and check your data.',
      })
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

        <FormControl
          id="password"
          as={Stack}
          spacing={1}
          isInvalid={errors.password}
        >
          <FormLabel>
            <HStack spacing={1}>
              <span>Password</span>
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

        <Button type="submit" colorScheme="teal" width="100%">
          Create my account
        </Button>

        <Stack fontSize="sm" opacity={0.75}>
          <Divider opacity={1} />
          <Text>
            Already have a Catamyst account?{' '}
            <NextLink href="/signin">
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
        <PopoverBody as={Stack} fontWeight="normal">
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
