import { useState } from 'react'
import NextHead from 'next/head'
import { useForm } from 'react-hook-form'
import {
  chakra,
  Heading,
  Text,
  Stack,
  VStack,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react'

import { Icon, LinkButton } from '@components'
import { OnboardContainer } from '@components/onboard'
import { supabase } from '@lib'

type Mode = string
type Inputs = { mode: string }

export function OnboardMode({ state }) {
  const [loading, setLoading] = useState(false)
  const [selectedMode, setSelectedMode] = useState<Mode>()
  const options = ['Learner', 'Teacher', 'Employer', 'Investor']
  const { register, handleSubmit, watch, setError, errors } = useForm<Inputs>()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'mode',
    onChange: setSelectedMode,
  })

  const group = getRootProps()

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { error } = await supabase
        .from('profiles')
        .upsert(
          { id: state.user!.id, mode: selectedMode },
          { returning: 'minimal' }
        )
        .single()
      if (error) throw error
      setLoading(false)
      state.router.push('/onboard/ready')
    } catch (error) {
      setLoading(false)
      console.error({ error })
    }
  }

  return (
    <>
      <NextHead>
        <title>What's best to describe you? · Catamyst</title>
      </NextHead>

      <OnboardContainer>
        <Stack>
          <Heading
            as="h1"
            size="xl"
            bgClip="text"
            bgGradient="linear(to-r, teal.400, green.400)"
          >
            What's best to describe you?
          </Heading>
          <Text>You can change this later in your settings.</Text>
        </Stack>

        <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <FormControl
            as={Stack}
            align="flex-start"
            isInvalid={Boolean(errors.mode)}
            autoFocus
          >
            <Stack
              {...group}
              direction={{ base: 'column', sm: 'row' }}
              name="mode"
            >
              {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                  <ModeRadioCard key={value} {...radio}>
                    {value}
                  </ModeRadioCard>
                )
              })}
            </Stack>
          </FormControl>

          <ButtonGroup size="sm" colorScheme="blue">
            <Button
              type="submit"
              isDisabled={
                Boolean(!state.profile.mode) || Boolean(!selectedMode)
              }
              isLoading={loading}
              loadingText="Saving..."
              leftIcon={<Icon name="save" />}
            >
              Next
            </Button>
            <LinkButton
              href="/onboard/welcome"
              variant="ghost"
              leftIcon={<Icon name="back" />}
            >
              Back
            </LinkButton>
          </ButtonGroup>
        </Stack>
      </OnboardContainer>
    </>
  )
}

export function ModeRadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <VStack
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="xs"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _hover={{
          borderColor: 'teal.600',
        }}
        _focus={{ boxShadow: 'outline' }}
        px={5}
        py={3}
      >
        <chakra.span fontSize="2xl">
          <Icon name={props.children.toLowerCase()} />
        </chakra.span>
        <chakra.span>{props.children}</chakra.span>
      </VStack>
    </Box>
  )
}
