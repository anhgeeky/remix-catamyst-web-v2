import NextLink from 'next/link'
import {
  Button,
  Flex,
  HStack,
  Image,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { ColorModeToggle, Logo, NavLink, MenuToggle } from '@/components'
import publicPages from '@/data/public-pages.json'

export default function Header() {
  const bg = useColorModeValue('white', 'gray.900')

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
                <Logo />
              </a>
            </NextLink>
            <ColorModeToggle display={{ base: 'none', md: 'flex' }} />
          </HStack>
        </Flex>

        <Flex flex={1} justify="center" display={{ base: 'none', md: 'flex' }}>
          <HStack spacing={1}>
            {publicPages.map((page, index) => {
              return <NavLink key={index} page={page} />
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
