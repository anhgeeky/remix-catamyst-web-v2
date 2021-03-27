import { Link, HStack, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { Icon } from '@components'

import dataSocialLinks from '@data/social-links.json'

export function SocialLinks({ links = dataSocialLinks, size = 'xl' }) {
  return (
    <HStack spacing={2}>
      {links.map((link, index) => {
        return (
          <Tooltip
            key={index}
            hasArrow
            label={link.url}
            aria-label={link.url}
            placement="top"
            fontSize="md"
          >
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
          </Tooltip>
        )
      })}
    </HStack>
  )
}
