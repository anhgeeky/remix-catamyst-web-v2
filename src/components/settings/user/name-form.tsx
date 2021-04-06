import { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ButtonGroup,
  InputGroup,
  FormHelperText,
  IconButton,
  HStack,
  FormErrorMessage,
  Select,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Card, Icon } from '@components'
import { useToast } from '@hooks'
import { supabase } from '@lib'
import { NameNickSchema } from '@utils/yup'

type Inputs = {
  name?: string
  nickname?: string
}

export function UserNameForm({ state }) {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    mode: 'onSubmit',
    resolver: yupResolver(NameNickSchema),
  })

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { data, error } = await supabase
        .from('profiles')
        .update(
          { id: state.user!.id, name: form.name, nickname: form.nickname },
          { returning: 'minimal' }
        )
        .eq('id', state.user!.id)
      toast({ status: 'success', title: 'Your names are changed' })
      setLoading(false)
    } catch (error) {
      toast({ status: 'error', title: 'Failed to change names' })
      setLoading(false)
    }
  }

  return (
    <Card id="name">
      <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <FormControl as={Stack} isInvalid={Boolean(errors.name)}>
          <FormLabel>Full name</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Elon Reeve Musk"
              defaultValue={state.profile.name}
              name="name"
              ref={register}
            />
          </InputGroup>
          {errors.name && (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}
          <FormHelperText>
            Your full name or a display name you are comfortable with. Max 50
            characters.
          </FormHelperText>
        </FormControl>

        <FormControl
          as={Stack}
          spacing={1}
          isInvalid={Boolean(errors.nickname)}
        >
          <FormLabel>Nick name</FormLabel>
          <Input
            type="text"
            placeholder="Elon"
            defaultValue={state.profile.nickname}
            name="nickname"
            ref={register}
          />
          {errors.nickname && (
            <FormErrorMessage>{errors.nickname?.message}</FormErrorMessage>
          )}
          <FormHelperText>
            Your nick name so we know what to call you. Max 10 characters.
          </FormHelperText>
        </FormControl>

        <Button
          alignSelf="flex-start"
          colorScheme="blue"
          isDisabled={Boolean(errors.name) || Boolean(errors.nickname)}
          isLoading={loading}
          leftIcon={<Icon name="save" />}
          loadingText="Saving..."
          size="sm"
          type="submit"
        >
          Save names
        </Button>
      </Stack>
    </Card>
  )
}
