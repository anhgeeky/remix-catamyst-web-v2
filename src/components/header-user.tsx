import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import {
  Avatar,
  Flex,
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'

import { Icon, useToast } from '@components'
import { signOut } from '@features/auth/actions'

export default function HeaderUser() {
  const auth = useSelector((state) => state.auth)

  /**
   * The UserMenuButton has issue with SSR
   * because auth.isAuthenticated condition
   */
  return (
    <>
      {auth.isAuthenticated ? (
        <UserMenuButton auth={auth} />
      ) : (
        <UserAuthButtons />
      )}
    </>
  )
}

function UserMenuButton({ auth }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast({ duration: 3000, isClosable: true })

  async function handleSignOut() {
    dispatch(signOut())
    toast({ status: 'warning', title: 'Signed out. Bye!' })
  }

  return (
    <Box>
      <Menu>
        <MenuButton
          aria-label="User menu button"
          cursor="pointer"
          _focus={{
            boxShadow: '0 0 0 3px var(--color-secondary)',
            borderRadius: 'full',
          }}
        >
          <Avatar name={auth.user.name} size="sm" />
        </MenuButton>

        <MenuList boxShadow="lg">
          <MenuItem onClick={() => router.push(`/${auth.user.handle}`)}>
            <Flex direction="column">
              Signed in as <b>@{auth.user.handle}</b>
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => router.push('/dashboard')}>
            <Icon name="dashboard" />
            <Text as="span" ml={2}>
              Dashboard
            </Text>
          </MenuItem>
          <MenuItem onClick={() => router.push(`/${auth.user.handle}`)}>
            <Icon name="profile" />
            <Text as="span" ml={2}>
              Profile
            </Text>
          </MenuItem>
          <MenuItem onClick={() => router.push('/settings')}>
            <Icon name="settings" />
            <Text as="span" ml={2}>
              Settings
            </Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleSignOut} color="red.500">
            <Icon name="signout" />
            <Text as="span" ml={2}>
              Sign out
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

function UserAuthButtons() {
  return (
    <>
      <Box display={{ base: 'none', md: 'block' }}>
        <NextLink href="/signup" passHref>
          <Button as={Link} variant="ghost" _hover={{ textDecoration: 'none' }}>
            Sign up
          </Button>
        </NextLink>
      </Box>
      <Box>
        <NextLink href="/signin" passHref>
          <Button
            as={Link}
            colorScheme="teal"
            _hover={{ textDecoration: 'none' }}
          >
            Sign in
          </Button>
        </NextLink>
      </Box>
    </>
  )
}
