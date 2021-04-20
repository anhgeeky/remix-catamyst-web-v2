import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Box,
  Wrap,
  WrapItem,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { dataDashboardLinks } from '@data'

export function DashboardSidebar() {
  const router = useRouter()

  return (
    <Wrap
      as={Stack}
      role="tablist"
      width="100%"
      spacing={{ base: 0, sm: 2, lg: 0 }}
      direction={{ base: 'row', lg: 'column' }}
      maxW={{ base: '100%', lg: '240px' }}
    >
      {dataDashboardLinks.map((link, index) => {
        const isActive = router.asPath === link.href

        return (
          <WrapItem key={index} role="tab">
            <SidebarLink href={link.href} isActive={isActive}>
              {link.text}
            </SidebarLink>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

function SidebarLink({ href, isActive = false, children }) {
  const bgColor = {
    bg: useColorModeValue('gray.100', 'gray.800'),
    color: useColorModeValue('teal.500', 'teal.200'),
  }

  return (
    <NextLink href={href} passHref>
      <Box
        as={Link}
        aria-current={isActive ? 'page' : undefined}
        width="100%"
        p={2}
        rounded="md"
        fontWeight="500"
        color={useColorModeValue('black', 'white')}
        _focus={{
          ...bgColor,
        }}
        _hover={{
          textDecoration: 'none',
          ...bgColor,
        }}
        _activeLink={{
          bg: useColorModeValue('gray.200', 'black'),
          fontWeight: '700',
        }}
      >
        {children}
      </Box>
    </NextLink>
  )
}
