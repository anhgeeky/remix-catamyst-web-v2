import NextImage from 'next/image'
import {
  Button,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserCoverForm({ state }) {
  const { profile } = state

  return (
    <Card id="cover">
      <FormControl as={Stack} align="flex-start">
        <FormLabel>Cover</FormLabel>
        <Box
          zIndex={1}
          height={100}
          width="100%"
          cursor="pointer"
          transition="0.25s ease"
          _hover={{ opacity: 0.75 }}
          bg={useColorModeValue('gray.300', 'gray.500')}
        >
          <Box className="next-image-cover-container">
            {profile.coverUrl && (
              <NextImage
                alt={`Cover picture of ${profile.name}`}
                src={profile.coverUrl}
                layout="fixed"
                objectFit="cover"
                width={720}
                height={100}
              />
            )}
          </Box>
        </Box>
        <FormHelperText>
          Profile cover. Click the box to upload. Recommended size is
          2400×400px.
        </FormHelperText>
        <Button
          alignSelf="flex-start"
          leftIcon={<Icon name="save" />}
          colorScheme="blue"
          size="sm"
        >
          Save cover image
        </Button>
      </FormControl>
    </Card>
  )
}
