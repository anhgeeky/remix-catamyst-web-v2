import NextLink from 'next/link'
import {
  useColorModeValue,
  Flex,
  Image,
  HStack,
  Link,
  Button,
} from '@chakra-ui/react'
import { ColorModeToggle } from '@/components'

export default function Header() {
  const bg = useColorModeValue('white', 'gray.900')

  const publicPages = [
    { href: '/learn', text: 'Learn' },
    { href: '/discover', text: 'Discover' },
    { href: '/forum', text: 'Forum' },
    { href: '/jobs', text: 'Jobs' },
    { href: '/pricing', text: 'Pricing' },
    { href: '/help', text: 'Help' },
  ]

  return (
    <Flex
      as="header"
      bg={bg}
      boxShadow="md"
      justify="center"
      pos="fixed"
      top="0"
      width="100%"
      zIndex="3"
    >
      <Flex as="nav" maxW={1200} align="center" width="100%" px={4} py={2}>
        <Flex flex={1}>
          <HStack spacing={2}>
            <NextLink href="/">
              <a aria-label="Catamyst, back to homepage">
                <Image
                  src="/images/catamyst-logo.png"
                  alt="Catamyst logo"
                  height={30}
                  width={150}
                  objectFit="contain"
                />
              </a>
            </NextLink>
            <ColorModeToggle display={{ base: 'none', md: 'flex' }} />
          </HStack>
        </Flex>

        <Flex flex={1} justify="center" display={{ base: 'none', md: 'flex' }}>
          <HStack spacing={4}>
            {publicPages.map((page, index) => {
              return (
                <NextLink href={page.href} key={index}>
                  <Link aria-label={page.text}>{page.text}</Link>
                </NextLink>
              )
            })}
          </HStack>
        </Flex>

        <Flex flex={1} justify="flex-end">
          <HStack spacing={2}>
            <NextLink href="/signup">
              <Button variant="ghost" display={{ base: 'none', md: 'flex' }}>
                Sign up
              </Button>
            </NextLink>
            <NextLink href="/signin">
              <Button colorScheme="teal">Sign in</Button>
            </NextLink>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}
