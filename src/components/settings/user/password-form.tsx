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
        <FormLabel fontSize="xl">Current password</FormLabel>
        <InputGroup>
          <Input type="password" />
          <InputRightElement
            color="green.500"
            children={<Icon name="check" />}
          />
        </InputGroup>
        <FormHelperText>
          Your secret password or passphrase. Please manage it using password
          manager like{' '}
          <Link isExternal href="https://bitwarden.com">
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
        Save password
      </Button>
    </Card>
  )
}
