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

import { Card, Icon } from '@components'
import { dataAppCountries } from '@data'

export function UserPersonalForm({ user }) {
  return (
    <Card id="profile" as={Stack} align="flex-start">
      <Heading as="h3" size="md">
        Personal Details
      </Heading>

      <FormControl as={Stack} spacing={1}>
        <FormLabel>Headline</FormLabel>
        <Input
          type="text"
          placeholder="Your title or tagline"
          defaultValue={user.headline}
        />
        <FormHelperText>Your headline is for title or tagline.</FormHelperText>
      </FormControl>

      <FormControl as={Stack} spacing={1}>
        <FormLabel>Bio</FormLabel>
        <Textarea
          type="text"
          placeholder="Tell a bit about yourself."
          defaultValue={user.bioHtml}
        />
        <FormHelperText>Your biography. Max 500 characters.</FormHelperText>
      </FormControl>

      <FormControl as={Stack} spacing={1}>
        <FormLabel>Country or Region</FormLabel>
        <SelectCountries user={user} />
        <FormHelperText>Your origin or current resided country.</FormHelperText>
      </FormControl>

      <FormControl as={Stack} spacing={1}>
        <FormLabel>Location</FormLabel>
        <Input
          type="text"
          placeholder="City, State or Remote or Worldwide"
          defaultValue={user.location}
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
            defaultValue={user.website.url}
          />
          <InputRightElement
            color="green.500"
            children={<Icon name="check" />}
          />
        </InputGroup>
      </FormControl>

      <Button
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
      >
        Save personal details
      </Button>
    </Card>
  )
}

export function SelectCountries({ user }) {
  return (
    <Select placeholder="Select country" defaultValue={user.country}>
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
