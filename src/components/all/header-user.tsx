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
  useMediaQuery,
} from '@chakra-ui/react'

import { Icon, LinkButton, useToast } from '@components'
import { signOut } from '@features/auth/actions'

export function HeaderUser() {
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
          <MenuItem onClick={() => router.push('/dashboard/overview')}>
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
          <MenuItem onClick={() => router.push('/settings/overview')}>
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
  const [isTooSmall] = useMediaQuery('(max-width: 350px)') // Less than

  return (
    <>
      <Box display={{ base: 'none', md: 'block' }}>
        <LinkButton href="/signup" variant="ghost">
          Sign up
        </LinkButton>
      </Box>
      <Box display={isTooSmall ? 'none' : 'block'}>
        <LinkButton href="/signin" colorScheme="teal">
          Sign in
        </LinkButton>
      </Box>
    </>
  )
}
