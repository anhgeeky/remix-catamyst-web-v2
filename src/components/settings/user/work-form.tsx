import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserWorkForm({ state }) {
  const { profile } = state

  return (
    <Card as={Stack}>
      <Heading as="h3" size="md">
        Work Details
      </Heading>
      <FormControl as={Stack} spacing={1}>
        <FormLabel>Job Title</FormLabel>
        <Input type="text" placeholder="Developer" />
      </FormControl>
      <FormControl as={Stack} spacing={1}>
        <FormLabel>Organization Name</FormLabel>
        <Input type="text" placeholder="Developer" />
      </FormControl>
      <FormControl as={Stack} spacing={1}>
        <FormLabel>Organization Website URL</FormLabel>
        <Input type="text" placeholder="https://organization.com" />
      </FormControl>
      <FormControl as={Stack} spacing={1}>
        <FormLabel>Organization Handle</FormLabel>
        <InputGroup>
          <InputLeftAddon children="catamyst.com/" />
          <Input
            type="text"
            placeholder="organization"
            defaultValue={profile.organization?.handle || ''}
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
        Save work details
      </Button>
    </Card>
  )
}
