import NextLink from 'next/link'
import {
  chakra,
  HStack,
  Link,
  Button,
  Flex,
  Text,
  IconButton,
  Stack,
  StackDivider,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { RemoveScroll } from 'react-remove-scroll'
import { FaTimes } from 'react-icons/fa'

import { ColorModeToggle, Icon, SocialLinks } from '@components'
import { useAuth, useRouteChanged } from '@hooks'
import { dataMenuLinks } from '@data'

/**
 * menu-link needs CSS to retain accessibility on focus.
 */
export function MenuPanel({ closeMenu, isMenuOpen }) {
  const { router, isAuthenticated } = useAuth()
  const bg = useColorModeValue('white', 'gray.900')
  const dividerBorderColor = useColorModeValue('gray.200', 'gray.700')

  /**
   * When menu button is clicked or route is changed, close menu
   */
  useRouteChanged(closeMenu)

  return (
    <>
      {isMenuOpen && (
        <RemoveScroll forwardProps>
          <Flex
            justify="center"
            width="100%"
            height="100vh"
            pos="fixed"
            top="0"
            left="0"
            bg={bg}
            zIndex={10}
          >
            <Stack
              as="nav"
              width="100%"
              height="100vh"
              justify="space-between"
              maxW={1200}
              spacing={2}
              px={{ base: 2, sm: 4 }}
              py={{ base: 1, sm: 2 }}
            >
              <Stack>
                <Flex justify="space-between">
                  <ColorModeToggle />
                  <IconButton
                    size="sm"
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
                  spacing={1}
                >
                  {dataMenuLinks.map((page, index) => {
                    const isActive = router.asPath === page.href
                    return (
                      <NextLink key={page.slug} href={page.href} passHref>
                        <chakra.a color={isActive && 'teal.500'}>
                          <HStack
                            display="flex"
                            px={3}
                            py={1}
                            cursor="pointer"
                            align="center"
                            borderRadius="md"
                            _hover={{
                              bg: useColorModeValue('gray.200', 'gray.700'),
                            }}
                          >
                            <Icon name={page.slug} />
                            <Text as="span" ml={2}>
                              {page.text}
                            </Text>
                          </HStack>
                        </chakra.a>
                      </NextLink>
                    )
                  })}
                </Stack>

                {!isAuthenticated && (
                  <Stack
                    align="stretch"
                    justify=""
                    direction={['column', 'row']}
                  >
                    <NextLink href="/signup" passHref>
                      <Button flex={[null, 1]}>Sign up</Button>
                    </NextLink>
                    <NextLink href="/signin" passHref>
                      <Button flex={[null, 1]} colorScheme="teal">
                        Sign in
                      </Button>
                    </NextLink>
                  </Stack>
                )}
              </Stack>

              <VStack p={5}>
                <SocialLinks />
              </VStack>
            </Stack>
          </Flex>
        </RemoveScroll>
      )}
    </>
  )
}
