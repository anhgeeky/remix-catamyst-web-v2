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
  useMediaQuery,
} from '@chakra-ui/react'

import { Icon, LinkButton, useToast } from '@components'
import { signOut } from '@features/auth/actions'
import { useAuth } from '@hooks'

export function HeaderUser() {
  const state = useAuth()

  /**
   * The UserMenuButton has issue with SSR
   * because auth.isAuthenticated condition
   */
  return (
    <>
      {state.auth.isAuthenticated && state.auth.profile && state.user ? (
        <UserMenuButton state={state} />
      ) : (
        <UserAuthButtons />
      )}
    </>
  )
}

function UserMenuButton({ state }) {
  const { auth, user } = state
  const router = useRouter()
  const dispatch = useDispatch()

  async function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Box>
      <Menu isLazy>
        <MenuButton
          aria-label="User menu button"
          cursor="pointer"
          _focus={{
            boxShadow: '0 0 0 3px var(--color-secondary)',
            borderRadius: 'full',
          }}
        >
          <Box border="1px solid" borderColor="gray.100" rounded="full">
            <Avatar
              src={auth.profile.avatar_url}
              name={auth.profile.name}
              size="sm"
            />
          </Box>
        </MenuButton>
        <MenuList boxShadow="lg">
          {!auth.profile.handle && user?.email && (
            <MenuItem>
              <Flex direction="column">
                Signed in as <b>{user.email}</b>
              </Flex>
            </MenuItem>
          )}
          {auth.profile.handle && (
            <MenuItem onClick={() => router.push(`/${auth.profile.handle}`)}>
              <Flex direction="column">
                Signed in as <b>@{auth.profile.handle}</b>
              </Flex>
            </MenuItem>
          )}

          <MenuDivider />

          <NextLink href="/dashboard/overview" passHref>
            <MenuItem as="a">
              <Icon name="dashboard" />
              <Text as="span" ml={2}>
                Dashboard
              </Text>
            </MenuItem>
          </NextLink>

          {auth.profile.handle && (
            <MenuItem onClick={() => router.push(`/${auth.profile.handle}`)}>
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
  const [isTooSmall] = useMediaQuery('(max-width: 350px)')

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
