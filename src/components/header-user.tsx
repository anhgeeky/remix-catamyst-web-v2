import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  useToast,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { signOut } from '@/features/auth/actions'

export default function HeaderUser() {
  const auth = useSelector((state) => state.auth)
  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast()

  async function handleSignOut() {
    dispatch(signOut())
    await router.replace('/')
    toast({
      title: 'Signed out. Bye!',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  return (
    <>
      {auth.isAuthenticated && auth.user && (
        <Box>
          <Menu>
            <MenuButton aria-label="User menu button" cursor="pointer">
              <Avatar name={auth.user.name} size="sm" />
            </MenuButton>
            <MenuList>
              <MenuGroup title={`@${auth.user.handle}`}>
                <MenuItem onClick={() => router.push('/dashboard')}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => router.push(`/${auth.user.handle}`)}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => router.push('/settings')}>
                  Settings
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}

      {!auth.isAuthenticated && (
        <>
          <Box display={{ base: 'none', md: 'block' }}>
            <NextLink href="/signup">
              <Button variant="ghost">Sign up</Button>
            </NextLink>
          </Box>
          <Box>
            <NextLink href="/signin">
              <Button colorScheme="teal">Sign in</Button>
            </NextLink>
          </Box>
        </>
      )}
    </>
  )
}
