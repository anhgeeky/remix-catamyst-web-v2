import NextImage from 'next/image'
import { Avatar, Box } from '@chakra-ui/react'

export function OrganizationAvatar({ org }) {
  return (
    <>
      {!org.avatar_url && (
        <Avatar
          name={org.name}
          src={org.avatar_url}
          width={100}
          height={100}
          size="2xl"
          rounded="md"
        />
      )}
      {org.avatar_url && (
        <Box className="next-image-container org-avatar" rounded="md">
          <NextImage
            className="next-image"
            src={org.avatar_url}
            width={100}
            height={100}
            layout="fixed"
          />
        </Box>
      )}
    </>
  )
}
