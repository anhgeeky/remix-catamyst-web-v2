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
  useToast,
} from '@chakra-ui/react'
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
  const toast = useToast()

  async function handleSignOut() {
    dispatch(signOut())
    toast({
      title: 'Signed out. Bye!',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  return (
    <Box>
      <Menu>
        <MenuButton
          aria-label="User menu button"
          cursor="pointer"
          _focus={{ boxShadow: '0 0 0 3px #aca', borderRadius: 'full' }}
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
            Dashboard
          </MenuItem>
          <MenuItem onClick={() => router.push(`/${auth.user.handle}`)}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleSignOut} color="red.500">
            Sign out
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
