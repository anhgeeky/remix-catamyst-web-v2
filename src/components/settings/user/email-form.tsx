import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserEmailForm({ user }) {
  return (
    <Card id="handle" as={Stack}>
      <FormControl as={Stack} align="flex-start">
        <FormLabel>Current email</FormLabel>
        <InputGroup>
          <Input
            type="email"
            placeholder="you@example.com"
            defaultValue={user.email || 'name@example.com'}
            autoFocus
          />
          <InputRightElement color="green.500">
            <Icon name="check" />
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          We will email you to confirm the change.
        </FormHelperText>
      </FormControl>

      <Button
        isDisabled
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
        size="sm"
      >
        Update email
      </Button>
    </Card>
  )
}
