import NextLink from 'next/link'
import {
  Box,
  Wrap,
  WrapItem,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

export default function DashboardSidebar() {
  const links = [
    { text: 'Overview', href: '/dashboard', isActive: true },
    { text: 'Tracks', href: '/dashboard/tracks' },
    { text: 'Projects', href: '/dashboard/projects' },
    { text: 'Posts', href: '/dashboard/posts' },
    { text: 'Mentors', href: '/dashboard/mentors' },
    { text: 'Jobs', href: '/dashboard/jobs' },
    { text: 'Discussions', href: '/dashboard/discussions' },
  ]

  return (
    <Wrap
      as={Stack}
      width="100%"
      spacing={{ base: 0, sm: 2, lg: 0 }}
      direction={{ base: 'row', lg: 'column' }}
      maxW={{ base: '100%', lg: '240px' }}
    >
      {links.map((link, index) => {
        return (
          <WrapItem key={index}>
            <SidebarLink href={link.href} isActive={link.isActive}>
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
