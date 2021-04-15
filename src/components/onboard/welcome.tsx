import { useState } from 'react'
import NextHead from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Content, Card, Icon } from '@components'
import { OnboardContainer } from '@components/onboard'
import { HandleSchema } from '@utils/yup'
import { supabase } from '@lib'

type Inputs = { handle: string }

export function OnboardWelcome({ state }) {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, watch, setError, errors } = useForm<Inputs>({
    resolver: yupResolver(HandleSchema),
  })
  const watchHandle = watch('handle', '')

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { data, error } = await supabase
        .from('profiles')
        .update({ handle: form.handle }, { returning: 'minimal' })
        .eq('id', state.user!.id)
        .single()
      if (error) throw error
      setLoading(false)
      state.router.push('/onboard/mode')
    } catch (error) {
      setLoading(false)
      console.error({ error })
      if (error.code === '23505') {
        setError('handle', { message: 'Username is already used by someone' })
      } else {
        setError('handle', { message: 'Something wrong. Please try again' })
      }
    }
  }

  return (
    <>
      <NextHead>
        <title>Welcome aboard, {state.profile.name}! · Catamyst</title>
      </NextHead>

      <OnboardContainer>
        <Stack>
          <Heading
            as="h1"
            size="xl"
            bgClip="text"
            bgGradient="linear(to-r, teal.400, green.400)"
          >
            Welcome aboard,
            <br />
            {state.profile.name}!
          </Heading>
          <Stack>
            <Text>Let's setup your username.</Text>
          </Stack>
        </Stack>

        <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <FormControl
            as={Stack}
            align="flex-start"
            isInvalid={Boolean(errors.handle)}
          >
            <InputGroup>
              <Input
                type="text"
                placeholder="username"
                defaultValue={state.profile.handle}
                name="handle"
                ref={register}
                autoFocus
              />
              {(state.profile.handle || errors.handle) && (
                <InputRightElement
                  color={errors.handle ? 'red.500' : 'green.500'}
                  children={
                    errors.handle ? (
                      <Icon name="cross" />
                    ) : (
                      <Icon name="check" />
                    )
                  }
                />
              )}
            </InputGroup>
            {errors.handle && (
              <FormErrorMessage>{errors.handle?.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            alignSelf="flex-start"
            colorScheme="blue"
            isDisabled={
              (Boolean(!state.profile.handle) && Boolean(!watchHandle)) ||
              Boolean(errors.handle)
            }
            isLoading={loading}
            leftIcon={<Icon name="save" />}
            loadingText="Saving..."
            size="sm"
            type="submit"
          >
            Next
          </Button>
        </Stack>
      </OnboardContainer>
    </>
  )
}
