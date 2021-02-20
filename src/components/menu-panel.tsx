import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import { FaTimes } from 'react-icons/fa'
import { ColorModeToggle } from '@/components'
import useRouteChanged from '@/hooks/use-route-changed'

import publicPages from '@/data/public-pages.json'
import React from 'react'

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
              spacing={4}
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
                {publicPages.map((page, index) => {
                  return (
                    <Box key={index} as={NextLink} href={page.href}>
                      <a className="menu-link">{page.text}</a>
                    </Box>
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
            </Stack>
          </Flex>
        </RemoveScroll>
      )}
    </>
  )
}
