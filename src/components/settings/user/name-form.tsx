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

export function UserNameForm({ state }) {
  const { profile } = state

  return (
    <Card id="name" as={Stack}>
      <FormControl as={Stack}>
        <FormLabel>Full name</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder="Elon Reeve Musk"
            defaultValue={profile.name}
          />
        </InputGroup>
        <FormHelperText>
          Your full name or a display name you are comfortable with. Max 50
          characters.
        </FormHelperText>
      </FormControl>

      <FormControl as={Stack} spacing={1}>
        <FormLabel>Nick name</FormLabel>
        <Input type="text" placeholder="Elon" defaultValue={profile.nickname} />
        <FormHelperText>
          Your nick name so we know what to call you. Max 10 characters.
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
