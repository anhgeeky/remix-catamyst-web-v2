import { useState } from 'react'
import NextLink from 'next/link'
import {
  useColorModeValue,
  Box,
  Flex,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { SkipNavLink } from '@chakra-ui/skip-nav'

import {
  ColorModeToggle,
  Logo,
  NavLink,
  MenuToggle,
  MenuPanel,
  HeaderUser,
} from '@components'
import dataNavLinks from '@data/nav-links.json'

export default function Header() {
  const bg = useColorModeValue('white', 'gray.900')
  const borderBg = useColorModeValue('white', 'gray.700')
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isTablet] = useMediaQuery('(max-width: 768px)')

  function openMenu() {
    setMenuOpen(true)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <Flex
        as="header"
        bg={bg}
        boxShadow="md"
        justify="center"
        pos="fixed"
        left={0}
        top={0}
        width="100%"
        zIndex="3"
        borderBottom="1px"
        borderBottomColor={borderBg}
      >
        <SkipNavLink>Skip to content</SkipNavLink>
        <Flex
          as="nav"
          maxW={1200}
          align="center"
          width="100%"
          px={{ base: 2, sm: 4 }}
          py={2}
        >
          <Flex flex={1}>
            <HStack spacing={2}>
              <NextLink href="/">
                <a aria-label="Catamyst, back to homepage">
                  <Logo />
                </a>
              </NextLink>
              <Box>
                <ColorModeToggle />
              </Box>
            </HStack>
          </Flex>

          <Flex
            flex={1}
            justify="center"
            display={{ base: 'none', md: 'flex' }}
          >
            <HStack spacing={1}>
              {dataNavLinks.map((page, index) => {
                return <NavLink key={page.slug} page={page} />
              })}
            </HStack>
          </Flex>

          <Flex flex={1} justify="flex-end">
            <HStack spacing={1}>
              <HeaderUser />
              {isTablet && (
                <MenuToggle openMenu={openMenu} isMenuOpen={isMenuOpen} />
              )}
            </HStack>
          </Flex>
        </Flex>
      </Flex>

      {isMenuOpen && (
        <MenuPanel closeMenu={closeMenu} isMenuOpen={isMenuOpen} />
      )}
    </>
  )
}
