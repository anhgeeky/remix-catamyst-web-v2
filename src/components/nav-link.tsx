import NextLink from 'next/link'
import { HStack, Text, Link } from '@chakra-ui/react'

import { Icon } from '@components'

/**
 * nav-link needs CSS to retain accessibility on focus.
 */
export default function NavLink({ page }) {
  return (
    <Link as={NextLink} href={page.href} aria-label={page.text}>
      <a className="nav-link">
        <HStack
          display="flex"
          padding="8px 6px"
          opacity={0.5}
          transition="opacity 0.2s ease"
          cursor="pointer"
          align-items="center"
          _hover={{ opacity: 1 }}
        >
          <Icon name={page.slug} />
          <Text as="span" ml={1}>
            {page.text}
          </Text>
        </HStack>
      </a>
    </Link>
  )
}
