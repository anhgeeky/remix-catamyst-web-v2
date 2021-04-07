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
  Box,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserAvatarForm({ state }) {
  return (
    <Card id="avatar">
      <FormControl as={Stack} align="flex-start">
        <FormLabel>Avatar</FormLabel>
        <Box
          p={1}
          zIndex={1}
          rounded="full"
          cursor="pointer"
          transition="0.25s ease"
          _hover={{ opacity: 0.75 }}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Avatar
            name={state.profile.name}
            src={state.profile.avatar_url}
            size="lg"
          />
        </Box>
        <InputGroup>
          <Input
            type="text"
            placeholder="https://website.com/path/to/image.jpg"
            defaultValue={state.profile.avatar_url}
          />
          <InputRightElement
            color="green.500"
            children={<Icon name="check" />}
          />
        </InputGroup>
        <FormHelperText>
          Profile picture. Click on the avatar to upload and change. Or change
          the avatar URL directly. Recommended size is 300×300px.
        </FormHelperText>
        <Button
          alignSelf="flex-start"
          leftIcon={<Icon name="save" />}
          colorScheme="blue"
          size="sm"
        >
          Save avatar
        </Button>
      </FormControl>
    </Card>
  )
}
