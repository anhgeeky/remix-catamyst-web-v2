import { useState } from 'react'
import {
  Button,
  FormErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Card, Icon, LinkButton } from '@/components'
import { useToast } from '@/hooks'
import { supabase } from '@/lib'
import { ProfileModeSchema } from '@/utils/yup'

type Inputs = { mode: string }

export function ProfileModeForm({ state }) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(ProfileModeSchema),
  })

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { error } = await supabase
        .from('profiles')
        .update(
          { mode: form.mode, id: state.user?.id },
          { returning: 'minimal' }
        )
        .eq('id', state.user?.id)
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
          Account Mode
        </Heading>

        <Stack
          as={RadioGroup}
          name="mode"
          defaultValue={state.profile.mode}
          ref={register}
        >
          <Radio ref={register} value="Learner">
            Learner
          </Radio>
          <Radio ref={register} value="Teacher">
            Teacher
          </Radio>
          <Radio ref={register} value="Employer">
            Employer
          </Radio>
          <Radio ref={register} value="Investor">
            Investor
          </Radio>
        </Stack>
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
            Edit profile
          </LinkButton>
        </Stack>
      </Stack>
    </Card>
  )
}
