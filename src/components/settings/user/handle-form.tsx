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

import { Card, Icon } from '@components'

export function UserHandleForm({ user }) {
  return (
    <Card id="handle" as={Stack}>
      <FormControl as={Stack} align="flex-start">
        <FormLabel>Username</FormLabel>
        <InputGroup>
          <InputLeftAddon children="catamyst.com/" />
          <Input
            type="text"
            placeholder="username"
            defaultValue={user.handle}
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
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
      >
        Save username
      </Button>
    </Card>
  )
}
