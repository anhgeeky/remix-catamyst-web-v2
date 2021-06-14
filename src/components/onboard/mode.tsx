import { useState } from 'react'
import NextHead from 'next/head'
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

export function OnboardMode({ state }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedMode, setSelectedMode] = useState<string>('')

  const handleSubmitForm = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: state.user?.id,
            mode: selectedMode,
          },
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

        <Stack as="form" onSubmit={handleSubmitForm}>
          <ProfileModeForm actions={{ handleSubmitForm, setSelectedMode }} />
          <ButtonGroup size="sm" colorScheme="blue">
            <Button
              type="submit"
              loadingText="Saving..."
              leftIcon={<Icon name="save" />}
              isLoading={loading}
              isDisabled={
                Boolean(!state.profile.mode) || Boolean(!selectedMode)
              }
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

export function ProfileModeForm({ actions }) {
  const options = ['Learner', 'Teacher', 'Employer', 'Investor']
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'mode',
    onChange: actions.setSelectedMode,
  })
  const group = getRootProps()

  return (
    <FormControl as={Stack} align="flex-start" autoFocus>
      <Stack {...group} direction={{ base: 'column', sm: 'row' }} name="mode">
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <ProfileModeRadio key={value} {...radio}>
              {value}
            </ProfileModeRadio>
          )
        })}
      </Stack>
    </FormControl>
  )
}

export function ProfileModeRadio(props) {
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
