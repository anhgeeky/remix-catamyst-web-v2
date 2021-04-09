import NextImage from 'next/image'
import { Avatar, Box } from '@chakra-ui/react'

export function UserAvatar({ user, size = 100 }) {
  return (
    <>
      {!user.avatar_url && (
        <Avatar
          name={user.name}
          src={user.avatar_url}
          width={size}
          height={size}
          size="2xl"
          rounded="full"
        />
      )}
      {user.avatar_url && (
        <Box className="next-image-container user-avatar" rounded="full">
          <NextImage
            className="next-image-avatar"
            src={user.avatar_url}
            width={size}
            height={size}
            layout="fixed"
          />
        </Box>
      )}
    </>
  )
}
