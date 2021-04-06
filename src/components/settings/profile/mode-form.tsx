import { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Card, Icon, LinkButton } from '@components'
import { useToast } from '@hooks'
import { supabase } from '@lib'
import { ProfileModeSchema } from '@utils/yup'

type Inputs = { mode: string }

export function ProfileModeForm({ state }) {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    resolver: yupResolver(ProfileModeSchema),
  })

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { error } = await supabase
        .from('profiles')
        .update({ mode: form.mode }, { returning: 'minimal' })
        .eq('id', state.user!.id)
        .single()
      if (error) throw error
      toast({
        status: 'success',
        title: `Profile mode is changed to ${form.mode}`,
      })
      setLoading(false)
    } catch (error) {
      console.error(error)

      toast({ status: 'error', title: 'Failed to change profile mode' })
      setLoading(false)
    }
  }

  return (
    <Card id="profile-mode">
      <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <Heading as="h2" size="md">
          Profile Mode
        </Heading>

        <RadioGroup defaultValue={state.profile.mode} ref={register}>
          <Stack>
            <Radio name="mode" ref={register} value="Learner">
              Learner
            </Radio>
            <Radio name="mode" ref={register} value="Employer">
              Employer
            </Radio>
            <Radio name="mode" ref={register} value="Investor">
              Investor
            </Radio>
          </Stack>
        </RadioGroup>
        {errors.mode && (
          <FormErrorMessage>{errors.mode?.message}</FormErrorMessage>
        )}

        <Stack direction={{ base: 'column', sm: 'row' }}>
          <Button
            colorScheme="blue"
            isDisabled={Boolean(errors.mode)}
            isLoading={loading}
            leftIcon={<Icon name="save" />}
            loadingText="Changing..."
            size="sm"
            type="submit"
          >
            Change mode
          </Button>

          <LinkButton
            variant="outline"
            size="sm"
            href="/settings/profile"
            leftIcon={<Icon name="edit" />}
          >
            Edit profile details
          </LinkButton>
        </Stack>
      </Stack>
    </Card>
  )
}
