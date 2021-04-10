import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import {
  Avatar,
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

import { Icon, LinkButton } from '@components'
import { signOut } from '@features/auth/actions'
import { useProfile } from '@hooks'

// FIXME: Has issue with unknown hook, maybe because of supabase signout.
// Should back with redux auth.profile ?
export function HeaderUser() {
  const { isLoading, isError, profile } = useProfile(
    'id,handle,name,avatar_url'
  )

  if (!isLoading && !isError && profile) {
    return <UserMenuButton profile={profile} />
  }
  return <UserAuthButtons />
}

function UserMenuButton({ profile }) {
  const router = useRouter()
  const dispatch = useDispatch()

  async function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Box className="header-user" height={34}>
      <Menu>
        <MenuButton
          className="header-user-menu-button"
          aria-label="User menu button"
          cursor="pointer"
          _focus={{
            boxShadow: '0 0 0 3px var(--color-secondary)',
            borderRadius: 'full',
          }}
        >
          <Box
            border="1px solid"
            borderColor="gray.100"
            rounded="full"
            className="next-image-avatar-container"
          >
            {!profile.avatar_url && <Avatar name={profile.name} size="sm" />}
            {profile.avatar_url && (
              <Box className="next-image-container user-avatar" rounded="full">
                <NextImage
                  className="next-image"
                  src={profile.avatar_url}
                  layout="fixed"
                  width={32}
                  height={32}
                />
              </Box>
            )}
          </Box>
        </MenuButton>

        <MenuList boxShadow="lg">
          {!profile.handle && profile.name && (
            <MenuItem>
              <Flex direction="column">
                Signed in as <b>{profile.name}</b>
              </Flex>
            </MenuItem>
          )}
          {profile.handle && (
            <MenuItem onClick={() => router.push(`/${profile.handle}`)}>
              <Flex direction="column">
                Signed in as <b>@{profile.handle}</b>
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

          {profile.handle && (
            <NextLink href={`/${profile.handle}`} passHref>
              <MenuItem as="a">
                <Icon name="profile" />
                <Text as="span" ml={2}>
                  Profile
                </Text>
              </MenuItem>
            </NextLink>
          )}

          <NextLink href="/settings/overview" passHref>
            <MenuItem as="a">
              <Icon name="settings" />
              <Text as="span" ml={2}>
                Settings
              </Text>
            </MenuItem>
          </NextLink>

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
