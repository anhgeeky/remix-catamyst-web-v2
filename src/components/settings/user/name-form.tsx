import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ButtonGroup,
  InputGroup,
  FormHelperText,
  IconButton,
  HStack,
  Select,
  Stack,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserNameForm({ user }) {
  return (
    <Card id="name" as={Stack}>
      <FormControl as={Stack}>
        <FormLabel>Full name</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder="Elon Reeve Musk"
            defaultValue={user.name}
          />
        </InputGroup>
        <FormHelperText>
          Your full name or a display name you are comfortable with. Max 50
          characters.
        </FormHelperText>
      </FormControl>

      <FormControl as={Stack} spacing={1}>
        <FormLabel>Nick name</FormLabel>
        <Input type="text" placeholder="Elon" defaultValue={user.nickname} />
        <FormHelperText>
          Your nick name so we know what to call you.
        </FormHelperText>
      </FormControl>

      <Button
        alignSelf="flex-start"
        leftIcon={<Icon name="save" />}
        colorScheme="blue"
      >
        Save names
      </Button>
    </Card>
  )
}
