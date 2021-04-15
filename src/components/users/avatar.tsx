import NextImage from 'next/image'
import { Avatar, Box, useColorModeValue } from '@chakra-ui/react'

export function UserAvatar({ profile, size = 100 }) {
  return (
    <>
      {!profile.avatar_url && (
        <Avatar
          name={profile.name}
          src={profile.avatar_url}
          width={size}
          height={size}
          size="2xl"
          rounded="full"
        />
      )}
      {profile.avatar_url && (
        <Box
          className="next-image-container user-avatar"
          rounded="full"
          bg={useColorModeValue('gray.200', 'gray.500')}
        >
          <NextImage
            className="next-image-avatar"
            src={profile.avatar_url}
            width={size}
            height={size}
            layout="fixed"
          />
        </Box>
      )}
    </>
  )
}
