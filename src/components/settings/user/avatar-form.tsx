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

export function UserAvatarForm({ user }) {
  return (
    <Card id="avatar">
      <FormControl as={Stack} align="flex-start">
        <FormLabel>Your Avatar</FormLabel>
        <Box
          p={1}
          zIndex={1}
          rounded="full"
          cursor="pointer"
          transition="0.25s ease"
          _hover={{ opacity: 0.75 }}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Avatar name={user.name} src={user.avatarUrl} size="lg" />
        </Box>
        <FormHelperText>
          Profile picture. Click on the avatar to upload. Recommended size is
          300×300px.
        </FormHelperText>
        <Button
          alignSelf="flex-start"
          leftIcon={<Icon name="save" />}
          colorScheme="blue"
        >
          Save avatar
        </Button>
      </FormControl>
    </Card>
  )
}
