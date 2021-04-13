import { useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Textarea,
  Heading,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { Card, Icon } from '@components'
import { dataAppCountries } from '@data'
import { supabase } from '@lib'

type Inputs = {
  headline?: string
  bio_html?: string
  country?: string
  location?: string
  website_url?: string
}

export function UserPersonalForm({ state }) {
  const { profile } = state
  const [loading, setLoading] = useState<boolean>(false)
  const {
    control,
    errors,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    setError,
    watch,
  } = useForm<Inputs>({ mode: 'onSubmit' })

  const handleSubmitForm = async (form) => {
    console.log(form)

    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: state.user!.id,
            updated_at: new Date(),
            ...form,
          },
          { returning: 'minimal' }
        )
        .single()
      if (error) throw error
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
            {/* <InputRightElement
            color="green.500"
            children={<Icon name="check" />}
          /> */}
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
          // isDisabled={Boolean(errors)}
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
      placeholder="Select country"
      defaultValue={profile.country}
      name="country"
      ref={register}
    >
      {dataAppCountries.map((country, index) => {
        return (
          <option key={index} value={country.code}>
            {country.name}
          </option>
        )
      })}
    </Select>
  )
}
