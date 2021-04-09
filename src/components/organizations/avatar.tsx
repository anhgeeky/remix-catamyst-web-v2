import NextImage from 'next/image'
import { Avatar, Box } from '@chakra-ui/react'

export function OrganizationAvatar({ org, size = 100 }) {
  return (
    <>
      {!org.avatar_url && (
        <Avatar
          name={org.name}
          src={org.avatar_url}
          width={size}
          height={size}
          size="2xl"
          rounded="md"
        />
      )}
      {org.avatar_url && (
        <Box className="next-image-container org-avatar" rounded="md">
          <NextImage
            className="next-image"
            src={org.avatar_url}
            width={size}
            height={size}
            layout="fixed"
          />
        </Box>
      )}
    </>
  )
}
