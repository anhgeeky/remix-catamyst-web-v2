import { useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Textarea,
  Heading,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { dataCountries } from '@/data'
import { Card, Icon } from '@/components'
import { supabase } from '@/lib'
import { checkUrl } from '@/utils'
import { useToast } from '@/hooks'

type Inputs = {
  headline?: string
  bio_html?: string
  country?: string
  location?: string
  website_url?: string
}

export function UserPersonalForm({ state }) {
  const toast = useToast()
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
            ...form,
            website_url: form.website_url ? checkUrl(form.website_url) : '',
            // TODO: Can change to profile.url but needs database migration.
            // url: form.url ? checkUrl(form.url) : '',
          },
          { returning: 'minimal' }
        )
        .single()
      if (error) throw error
      toast({ status: 'success', title: 'Your personal details are changed' })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({ status: 'error', title: 'Failed to save personal details' })
      console.error({ error })
    }
  }

  return (
    <Card id="profile" align="flex-start">
      <Stack as="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <Heading as="h3" size="md">
          Personal Details
        </Heading>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Headline</FormLabel>
          <Input
            type="text"
            placeholder="Your title or tagline"
            defaultValue={profile.headline}
            name="headline"
            ref={register}
          />
          <FormHelperText>
            Your headline is for your job title, tagline, or motto.
          </FormHelperText>
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Bio</FormLabel>
          <Textarea
            type="text"
            placeholder="Tell a bit about yourself."
            defaultValue={profile.bio_html}
            name="bio_html"
            ref={register}
          />
          <FormHelperText>
            Your biography. You can use HTML here. Max 500 characters.
          </FormHelperText>
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Country or Region</FormLabel>
          <SelectCountries
            name="country"
            profile={profile}
            register={register}
          />
          <FormHelperText>
            Your origin or current resided country.
          </FormHelperText>
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            placeholder="City, State / Remote / Worldwide"
            defaultValue={profile.location}
            name="location"
            ref={register}
          />
          <FormHelperText>
            Your location is flexible and can be more specific than country. Max
            30 characters.
          </FormHelperText>
        </FormControl>

        <FormControl as={Stack} spacing={1}>
          <FormLabel>Your Website URL</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="https://website.com"
              defaultValue={profile.website_url}
              name="website_url"
              ref={register}
            />
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
          Save personal details
        </Button>
      </Stack>
    </Card>
  )
}

export function SelectCountries({ name, register, profile }) {
  return (
    <Select
      name={name}
      placeholder="Select country"
      defaultValue={profile.country}
      ref={register}
    >
      {dataCountries.map((country, index) => {
        return (
          <option key={index} value={country.code}>
            {country.name}
          </option>
        )
      })}
    </Select>
  )
}
