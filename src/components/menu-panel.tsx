import NextLink from 'next/link'
import {
  Box,
  HStack,
  Link,
  Button,
  Flex,
  Text,
  IconButton,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import { FaTimes } from 'react-icons/fa'

import { ColorModeToggle, Icon, SocialLinks } from '@components'
import useRouteChanged from '@hooks/use-route-changed'

import dataMenuLinks from '@data/menu-links.json'
import React from 'react'

/**
 * menu-link needs CSS to retain accessibility on focus.
 */
export default function MenuPanel({ closeMenu, isMenuOpen }) {
  const auth = useSelector((state) => state.auth)
  const bg = useColorModeValue('white', 'gray.900')
  const dividerBorderColor = useColorModeValue('gray.200', 'gray.700')

  useRouteChanged(closeMenu)

  return (
    <>
      {isMenuOpen && (
        <RemoveScroll forwardProps>
          <Flex
            justify="center"
            w="100%"
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            bg={bg}
            zIndex={10}
          >
            <Stack
              as="nav"
              width="100%"
              maxW={1200}
              spacing={2}
              px={{ base: 2, sm: 4 }}
              py={2}
            >
              <Flex justify="space-between">
                <ColorModeToggle />

                <IconButton
                  aria-label="Toggle menu"
                  variant="ghost"
                  onClick={closeMenu}
                >
                  <FaTimes />
                </IconButton>
              </Flex>

              <Stack
                align="stretch"
                divider={<StackDivider borderColor={dividerBorderColor} />}
              >
                {dataMenuLinks.map((page, index) => {
                  return (
                    <Link
                      key={page.slug}
                      as={NextLink}
                      href={page.href}
                      _hover={{ bg: 'teal.500' }}
                    >
                      <a className="menu-link">
                        <HStack
                          display="flex"
                          padding="10px"
                          cursor="pointer"
                          align="center"
                          borderRadius="md"
                          _hover={{
                            bg: useColorModeValue('teal.400', 'teal.700'),
                          }}
                        >
                          <Icon name={page.slug} />
                          <Text as="span" ml={2}>
                            {page.text}
                          </Text>
                        </HStack>
                      </a>
                    </Link>
                  )
                })}

                {!auth.isAuthenticated && (
                  <Stack
                    align="stretch"
                    justify=""
                    direction={['column', 'row']}
                  >
                    <NextLink href="/signup">
                      <Button flex={[null, 1]}>Sign up</Button>
                    </NextLink>
                    <NextLink href="/signin">
                      <Button flex={[null, 1]} colorScheme="teal">
                        Sign in
                      </Button>
                    </NextLink>
                  </Stack>
                )}
              </Stack>

              <SocialLinks />
            </Stack>
          </Flex>
        </RemoveScroll>
      )}
    </>
  )
}
