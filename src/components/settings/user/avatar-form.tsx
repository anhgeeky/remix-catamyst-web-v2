import { useState } from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Box,
  useColorModeValue,
  Avatar,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Card, Icon } from '@components'
import { useToast } from '@hooks'
import { supabase } from '@lib'

type Inputs = { avatar_url?: string }

export function UserAvatarForm({ state }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, errors } = useForm<Inputs>()

  const handleSubmitForm = async (form) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: form.avatar_url }, { returning: 'minimal' })
        .eq('id', state.user!.id)
      if (error) throw error
      toast({ status: 'success', title: 'Your avatar is changed' })
      setLoading(false)
    } catch (error) {
      toast({ status: 'error', title: 'Failed to change avatar' })
      setLoading(false)
    }
  }

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
        <InputGroup isDisabled size="sm">
          <Input
            type="text"
            placeholder="https://website.com/path/to/image.jpg"
            defaultValue={state.profile.avatar_url}
          />
          {state.profile.avatar_url && (
            <InputRightElement
              color="green.500"
              children={<Icon name="check" />}
            />
          )}
        </InputGroup>
        <FormHelperText>
          Profile picture. Click on the avatar to upload and change. Image
          should be square, recommended size is 300×300px (JPG/PNG/GIF).
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
