import { Link, HStack, useColorModeValue } from '@chakra-ui/react'
import { Icon } from '@components'

import dataSocialLinks from '@data/social-links.json'
import React from 'react'

export function SocialLinks({ links = dataSocialLinks }) {
  return (
    <HStack spacing={2}>
      {links.map((link) => {
        return (
          <Link
            isExternal
            aria-label={link.name}
            key={link.name}
            href={link.url}
            color="gray.500"
            fontSize="xl"
            _hover={{ color: useColorModeValue('gray.900', 'gray.100') }}
          >
            <Icon name={link.name.toLowerCase()} />
          </Link>
        )
      })}
    </HStack>
  )
}
