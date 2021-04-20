import { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Card, Icon } from '@components'
import { supabase } from '@lib'
import { HandleSchema } from '@utils/yup'
import { useToast } from '@hooks'
import { isDev } from '@utils'

type Inputs = { handle: string }

export function UserHandleForm({ state }) {
  const toast = useToast()
  const [isTooSmall] = useMediaQuery('(max-width: 62em)')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, setError, errors } = useForm<Inputs>({
    resolver: yupResolver(HandleSchema),
  })

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))

      const { error } = await supabase
        .from('profiles')
        .update({ handle: form.handle }, { returning: 'minimal' })
        .eq('id', state.user!.id)
        .single()
      if (error) throw error

      toast({ status: 'success', title: 'Your username is changed' })
      setLoading(false)
    } catch (error) {
      if (isDev) console.error(error)
      if (error.code === '23505') {
        setError('handle', { message: 'Username is already taken' })
        toast({ status: 'error', title: 'Username is already taken.' })
      } else {
        setError('handle', {
          message: 'Failed to save username. Please try again',
        })
        toast({
          status: 'error',
          title: 'Failed to save username. Please try again',
        })
      }
      setLoading(false)
    }
  }

  return (
    <Card id="handle">
      <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <FormControl
          as={Stack}
          align="flex-start"
          isInvalid={Boolean(errors.handle)}
        >
          <FormLabel>Username</FormLabel>
          <InputGroup>
            {!isTooSmall && <InputLeftAddon children="catamyst.com/" />}
            <Input
              type="text"
              placeholder="username"
              defaultValue={state.profile.handle}
              name="handle"
              ref={register}
              autoFocus={!isTooSmall}
            />
            <InputRightElement
              color={errors.handle ? 'red.500' : 'green.500'}
              children={
                errors.handle ? <Icon name="cross" /> : <Icon name="check" />
              }
            />
          </InputGroup>
          {errors.handle && (
            <FormErrorMessage>{errors.handle?.message}</FormErrorMessage>
          )}
          <FormHelperText>
            Your profile handle. Only alphabets, numbers, and underscores are
            allowed. Max 20 characters.
          </FormHelperText>
        </FormControl>

        <Button
          alignSelf="flex-start"
          colorScheme="blue"
          isDisabled={Boolean(errors.handle)}
          isLoading={loading}
          leftIcon={<Icon name="save" />}
          loadingText="Saving..."
          size="sm"
          type="submit"
        >
          Save username
        </Button>
      </Stack>
    </Card>
  )
}
