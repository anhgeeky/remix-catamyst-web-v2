import { Link, HStack, useColorModeValue } from '@chakra-ui/react'
import { Icon } from '@components'

import dataSocialLinks from '@data/social-links.json'
import React from 'react'

export function SocialLinks() {
  return (
    <HStack spacing={2} justify="center">
      {dataSocialLinks.map((link, index) => {
        return (
          <Link
            key={link.name}
            isExternal
            href={link.url}
            fontSize="xl"
            p={1}
            color="gray.500"
            _hover={{ color: useColorModeValue('gray.900', 'gray.100') }}
          >
            <Icon name={link.name.toLowerCase()} />
          </Link>
        )
      })}
    </HStack>
  )
}
