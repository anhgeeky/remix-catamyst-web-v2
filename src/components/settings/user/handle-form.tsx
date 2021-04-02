import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Card, Icon } from '@components'
import { useToast } from '@hooks'
import { supabase } from '@lib'

export function UserHandleForm({ state }) {
  const { profile } = state
  const toast = useToast()
  const { register, handleSubmit } = useForm()

  const handleChangeUsername = async (form) => {
    try {
      toast({ title: 'Changing username...' })
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: state.user!.id,
            handle: form.handle,
          },
          { returning: 'minimal' }
        )
        .eq('id', state.user!.id)
      if (error) throw error
      toast({ status: 'success', title: 'Changed username!' })
    } catch (error) {
      toast({ status: 'error', title: 'Failed to change username!' })
    }
  }

  return (
    <Card id="handle">
      <Stack as="form" onSubmit={handleSubmit(handleChangeUsername)}>
        <FormControl as={Stack} align="flex-start">
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftAddon children="catamyst.com/" />
            <Input
              type="text"
              placeholder="username"
              defaultValue={profile.handle}
              name="handle"
              ref={register}
            />
            <InputRightElement
              color="green.500"
              children={<Icon name="check" />}
            />
          </InputGroup>
          <FormHelperText>
            Your profile handle. Only alphabets, numbers, and underscores are
            allowed. Max 20 characters.
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          alignSelf="flex-start"
          leftIcon={<Icon name="save" />}
          colorScheme="blue"
        >
          Save username
        </Button>
      </Stack>
    </Card>
  )
}
