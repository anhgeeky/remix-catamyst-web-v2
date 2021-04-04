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
          <InputRightElement
            color="green.500"
            children={<Icon name="check" />}
          />
        </InputGroup>
        <FormHelperText>
          Your secret password or passphrase. Use minimum of 10 characters.
          Please manage it using password manager like{' '}
          <Link isExternal color="teal.500" href="https://bitwarden.com">
            Bitwarden
          </Link>{' '}
          or password management app of your choice.
        </FormHelperText>
      </FormControl>

      <Button
        isDisabled
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
      >
        Update password
      </Button>
    </Card>
  )
}
