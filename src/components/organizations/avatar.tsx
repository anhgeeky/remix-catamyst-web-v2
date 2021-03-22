import NextImage from 'next/image'
import { Avatar, Box } from '@chakra-ui/react'

export function OrganizationAvatar({ org }) {
  return (
    <>
      {!org.avatarUrl && (
        <Avatar
          name={org.name}
          src={org.avatarUrl}
          width={100}
          height={100}
          size="2xl"
          rounded="md"
        />
      )}
      {org.avatarUrl && (
        <Box className="next-image-container org-avatar" rounded="md">
          <NextImage
            className="next-image"
            src={org.avatarUrl}
            width={100}
            height={100}
            layout="fixed"
          />
        </Box>
      )}
    </>
  )
}
