import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Box,
  Flex,
  Wrap,
  WrapItem,
  Link,
  HStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import dataDashboardLinks from '@data/dashboard-links.json'
import React from 'react'

export default function DashboardTabs() {
  const router = useRouter()

  return (
    <Flex
      px={5}
      py={{ base: 3, md: 5 }}
      justify={{ base: 'flex-start', md: 'center' }}
    >
      <HStack role="tablist" spacing={2} width="1200px" px={{ base: 0, lg: 4 }}>
        {dataDashboardLinks.map((link, index) => {
          const isActive = router.asPath === link.href

          return (
            <TabLink key={link.href} href={link.href} isActive={isActive}>
              {link.text}
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
      <Box
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
      </Box>
    </NextLink>
  )
}
