import { useState } from 'react'
import NextLink from 'next/link'
import {
  useColorModeValue,
  ButtonGroup,
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
import { dataNavLinks } from '@data'

/**
 * Should only used inside of the actual app Component, not _app.tsx
 * Because it needs to trigger the useProfile/useProfile every app re-render.
 */
export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isTooSmall] = useMediaQuery('(max-width: 991px)') // Not 1024px

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
        boxShadow="md"
        justify="center"
        pos="fixed"
        left={0}
        top={0}
        width="100%"
        zIndex="3"
        borderBottom="1px"
        borderBottomColor={useColorModeValue('white', 'gray.700')}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <SkipNavLink>Skip to content</SkipNavLink>

        <Flex
          as="nav"
          align="center"
          width="100%"
          maxW={1200}
          px={{ base: 2, sm: 3 }}
          py={{ base: 1, sm: 2 }}
        >
          <Flex flex={1}>
            <HStack spacing={2}>
              <NextLink href="/">
                <a aria-label="Catamyst, back to homepage">
                  <Logo />
                </a>
              </NextLink>
              <ButtonGroup size="sm">
                <ColorModeToggle />
              </ButtonGroup>
            </HStack>
          </Flex>

          <Flex
            flex={1}
            justify="center"
            display={{ base: 'none', lg: 'flex' }}
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
              {isTooSmall && (
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
