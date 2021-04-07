import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Link,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserPasswordForm({ user }) {
  return (
    <Card id="handle" as={Stack}>
      <FormControl as={Stack} align="flex-start">
        <FormLabel>New password</FormLabel>
        <InputGroup>
          <Input type="password" />
        </InputGroup>
        <FormHelperText>
          Minimum 10 characters. Please manage it using password manager of your
          choice or{' '}
          <Link isExternal color="teal.500" href="https://bitwarden.com">
            Bitwarden
          </Link>
          .
        </FormHelperText>
      </FormControl>

      <Button
        isDisabled
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
        size="sm"
      >
        Update password
      </Button>
    </Card>
  )
}
