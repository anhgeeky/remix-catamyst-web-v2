import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  useMediaQuery,
  Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Card, Icon } from '@/components'
import { supabase } from '@/lib'
import { checkUrl } from '@/utils'
import { useToast } from '@/hooks'

type Inputs = {
  title?: string
  name?: string
  handle?: string
  url?: string
}

export function UserWorkForm({ state }) {
  const toast = useToast()
  const [isTooSmall] = useMediaQuery('(max-width: 62em)')
  const { profile } = state
  const [loading, setLoading] = useState<boolean>(false)
  const { handleSubmit, register } = useForm<Inputs>({ mode: 'onSubmit' })

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 300))

      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: state.user?.id,
            work: {
              ...form,
              url: form.url ? checkUrl(form.url) : '',
              // profile.work.url
            },
          },
          { returning: 'minimal' }
        )
        .single()

      if (error) throw error
      toast({ status: 'success', title: 'Your work details are changed' })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({ status: 'error', title: 'Failed to save work details' })
      console.error({ error })
    }
  }

  return (
    <Card>
      <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <Heading as="h3" size="md">
          Work Details
        </Heading>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Job Title or Role</FormLabel>
          <Input
            type="text"
            placeholder="Founder / Developer"
            defaultValue={profile.work?.title || ''}
            name="title"
            ref={register}
          />
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Workplace/Organization Name</FormLabel>
          <Input
            type="text"
            placeholder="Developer"
            defaultValue={profile.work?.name || ''}
            name="name"
            ref={register}
          />
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Workplace/Organization Website URL</FormLabel>
          <Input
            type="text"
            placeholder="https://organization.com"
            defaultValue={profile.work?.url || ''}
            name="url"
            ref={register}
          />
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Organization Handle</FormLabel>
          <InputGroup>
            {!isTooSmall && <InputLeftAddon>catamyst.com/</InputLeftAddon>}
            <Input
              type="text"
              placeholder="organization"
              defaultValue={profile.work?.handle || ''}
              name="handle"
              ref={register}
            />
            {/* <InputRightElement color="green.500">
              <Icon name="check" />
            </InputRightElement> */}
          </InputGroup>
        </FormControl>

        <Button
          alignSelf="flex-start"
          colorScheme="blue"
          isLoading={loading}
          leftIcon={<Icon name="save" />}
          loadingText="Saving..."
          size="sm"
          type="submit"
        >
          Save work details
        </Button>
      </Stack>
    </Card>
  )
}
