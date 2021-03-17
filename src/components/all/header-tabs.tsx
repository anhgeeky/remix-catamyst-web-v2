import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Box, Flex, Link, HStack, useColorModeValue } from '@chakra-ui/react'

import { Icon } from '@components'

export function HeaderTabs({ links }) {
  const router = useRouter()

  return (
    <Flex py={3} justify={{ base: 'flex-start', md: 'center' }}>
      <HStack
        role="tablist"
        className="tab-list"
        width="1200px"
        spacing={3}
        px={5}
        py={2}
        overflow="scroll"
      >
        {links.map((link) => {
          /**
           * If the current page contains the pathname
           */
          const isActive = router.asPath === link.href

          return (
            <TabLink key={link.slug} href={link.href} isActive={isActive}>
              <Icon name={link.slug} />
              <span>{link.text}</span>
            </TabLink>
          )
        })}
      </HStack>
    </Flex>
  )
}

function TabLink({ href, isActive = false, children }) {
  return (
    <NextLink href={href} passHref>
      <HStack
        as={Link}
        aria-current={isActive ? 'page' : undefined}
        p={2}
        rounded="md"
        color={useColorModeValue('black', 'white')}
        _focus={{
          bg: useColorModeValue('gray.100', 'gray.800'),
        }}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.100', 'gray.800'),
        }}
        _activeLink={{
          color: useColorModeValue('teal.500', 'teal.200'),
          bg: useColorModeValue('gray.200', 'black'),
        }}
      >
        {children}
      </HStack>
    </NextLink>
  )
}
