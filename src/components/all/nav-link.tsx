import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { HStack, Text, chakra } from '@chakra-ui/react'

import { Icon } from '@components'

/**
 * nav-link needs CSS to retain accessibility on focus.
 */
export function NavLink({ page }) {
  const router = useRouter()
  const isActive = router.asPath === page.href
  return (
    <NextLink href={page.href} aria-label={page.text} passHref>
      <chakra.a color={isActive && 'teal.500'}>
        <HStack
          display="flex"
          padding="8px 6px"
          transition="opacity 0.2s ease"
          cursor="pointer"
          align-items="center"
          opacity={!isActive && 0.5}
          _hover={{ opacity: 1 }}
        >
          <Icon name={page.slug} />
          <Text as="span" ml={1}>
            {page.text}
          </Text>
        </HStack>
      </chakra.a>
    </NextLink>
  )
}
