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
        <FormLabel fontSize="xl">Your Email</FormLabel>
        <InputGroup>
          <Input
            type="email"
            placeholder="you@example.com"
            defaultValue={user.email || 'name@example.com'}
          />
          <InputRightElement
            color="green.500"
            children={<Icon name="check" />}
          />
        </InputGroup>
        <FormHelperText>
          Your most active email to use to sign in. We will email you to verify
          the change.
        </FormHelperText>
      </FormControl>

      <Button
        isDisabled
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
      >
        Save email
      </Button>
    </Card>
  )
}
