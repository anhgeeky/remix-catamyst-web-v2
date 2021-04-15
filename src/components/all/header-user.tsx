import { useEffect, useReducer } from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  Avatar,
  HStack,
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

import { signOut } from '@features/auth/actions'
import { Icon, LinkButton } from '@components'
import { useProfile } from '@hooks'
import { Profile } from '@types'
import { supabase } from '@lib'
import { isDev } from '@utils'

type State = { profile: Profile }
type Action = { type?: string; payload: any }

export const profileEventReducer = (state: State, action: Action) => {
  if (action.type === 'SET_INITIAL_PROFILE') {
    return { profile: action.payload }
  } else if (action.type === 'UPDATE_PROFILE') {
    return { profile: action.payload }
  } else {
    return { profile: {} }
  }
}

export function HeaderUser() {
  /**
   * Already handle the check authentication for global use.
   */
  const state = useProfile()

  if (state.isAuthenticated && state.profile) {
    return <UserRealtimeBridge state={state} />
  }
  return <UserAuthButtons />
}

export function UserRealtimeBridge({ state }) {
  const initialState: State = state.profile
  const [localState, localDispatch] = useReducer(
    profileEventReducer,
    initialState
  )

  useEffect(() => {
    try {
      localDispatch({ type: 'SET_INITIAL_PROFILE', payload: state.profile })
    } catch (error) {
      console.error(`>>> ${error.message}`)
    }
  }, [state])

  useEffect(() => {
    try {
      const subscription = supabase
        .from(`profiles:id=eq.${state.profile.id}`)
        .on('*', (payload) => {
          localDispatch({ type: 'UPDATE_PROFILE', payload: payload.new })
        })
        .subscribe()
      return () => {
        supabase.removeSubscription(subscription)
      }
    } catch (error) {
      console.error(`>>> ${error.message}`)
    }
  }, [])

  /**
   * Only use from localState, not from state.profile
   * as there will be race condition.
   */
  if (!localState.profile) {
    return null
  }
  return <UserMenuButton profile={localState?.profile} />
}

function UserMenuButton({ profile }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isTooSmallDashboard] = useMediaQuery('(max-width: 425px)')

  return (
    <HStack className="header-user" height={34}>
      <Box display={isTooSmallDashboard ? 'none' : 'block'}>
        <LinkButton
          href="/dashboard/overview"
          leftIcon={<Icon name="dashboard" />}
          colorScheme="teal"
          size="sm"
        >
          Dashboard
        </LinkButton>
      </Box>

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
            {!profile?.avatar_url && <Avatar name={profile.name} size="sm" />}
            {profile?.avatar_url && (
              <Box className="next-image-container user-avatar" rounded="full">
                <NextImage
                  className="next-image"
                  src={profile?.avatar_url}
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </Box>
            )}
          </Box>
        </MenuButton>

        <MenuList boxShadow="lg">
          {!profile?.handle && profile?.name && (
            <MenuItem>
              <Flex direction="column">
                Signed in as <b>{profile?.name}</b>
              </Flex>
            </MenuItem>
          )}
          {profile?.handle && (
            <MenuItem onClick={() => router.push(`/${profile?.handle}`)}>
              <Flex direction="column">
                Signed in as <b>@{profile?.handle}</b>
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

          <MenuItem onClick={() => dispatch(signOut())} color="red.500">
            <Icon name="signout" />
            <Text as="span" ml={2}>
              Sign out
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}

function UserAuthButtons() {
  const [isTooSmallSignUp] = useMediaQuery('(max-width: 425px)')
  const [isTooSmallSignIn] = useMediaQuery('(max-width: 350px)')

  return (
    <>
      <Box display={isTooSmallSignUp ? 'none' : 'block'}>
        <LinkButton href="/signup" variant="ghost" size="sm">
          Sign up
        </LinkButton>
      </Box>
      <Box display={isTooSmallSignIn ? 'none' : 'block'}>
        <LinkButton href="/signin" colorScheme="teal" size="sm">
          Sign in
        </LinkButton>
      </Box>
    </>
  )
}
