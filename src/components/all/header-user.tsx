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
import { useAuth } from '@hooks'
import { signOut } from '@features/auth/actions'

export function HeaderUser() {
  // const auth = useSelector((state) => state.auth)
  const state = useAuth(`id, handle, name, avatar_url`)

  /**
   * The UserMenuButton has issue with SSR
   * because auth.isAuthenticated condition
   */
  return (
    <>
      {state.auth.isAuthenticated && state.user && state.profile ? (
        <UserMenuButton state={state} />
      ) : (
        <UserAuthButtons />
      )}
    </>
  )
}

function UserMenuButton({ state }) {
  const router = useRouter()
  const dispatch = useDispatch()

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
          <Avatar name={state.profile.name} size="sm" />
        </MenuButton>

        <MenuList boxShadow="lg">
          {state.profile.handle ? (
            <MenuItem onClick={() => router.push(`/${state.profile.handle}`)}>
              <Flex direction="column">
                Signed in as <b>@{state.profile.handle}</b>
              </Flex>
            </MenuItem>
          ) : (
            <MenuItem>
              <Flex direction="column">
                Signed in as <b>{state.user.email}</b>
              </Flex>
            </MenuItem>
          )}
          <MenuDivider />
          <MenuItem onClick={() => router.push('/dashboard/overview')}>
            <Icon name="dashboard" />
            <Text as="span" ml={2}>
              Dashboard
            </Text>
          </MenuItem>
          {state.profile.handle && (
            <MenuItem onClick={() => router.push(`/${state.profile.handle}`)}>
              <Icon name="profile" />
              <Text as="span" ml={2}>
                Profile
              </Text>
            </MenuItem>
          )}
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
