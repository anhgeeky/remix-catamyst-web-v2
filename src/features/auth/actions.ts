import { createStandaloneToast } from '@chakra-ui/react'

import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from '@features/auth/types'
import dataDefaultUser from '@data/user.json'

const toast = createStandaloneToast()
const toastOptions = {
  isClosable: true,
  duration: 1000,
  // variant: 'solid',
}

export const signUp = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_UP_BEGIN })
    toast({ title: 'Signing up...' })
    /**
     * There will be the actual sign up process with API.
     */
    try {
      const data = 'DATA_IS_HERE'
      if (data) {
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { user: dataDefaultUser },
        })
        toast.closeAll()
        toast({
          ...toastOptions,
          status: 'success',
          title: 'Signed up.',
          description: 'Welcome onboard!',
        })
      }
    } catch (error) {
      dispatch({ type: SIGN_UP_ERROR })
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to sign up.',
        description: 'Please try again and check your data.',
      })
    }
  }
}

export const signIn = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    toast({ title: 'Signing in...' })
    /**
     * There will be the actual sign in process with API.
     */
    try {
      const data = 'DATA_IS_HERE'
      if (data) {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: { user: dataDefaultUser },
        })
        toast.closeAll()
        toast({
          ...toastOptions,
          status: 'success',
          title: 'Signed in.',
          description: 'Welcome back!',
        })
      }
    } catch (error) {
      dispatch({ type: SIGN_IN_ERROR })
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to sign in.',
        description: 'Please try again and check your data.',
      })
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
    toast({ title: 'Signing out...' })
    /**
     * There will be the actual sign out process with API.
     */
    try {
      const data = 'DATA_IS_HERE'
      if (data) {
        dispatch({ type: SIGN_OUT_SUCCESS })
        toast.closeAll()
        toast({
          ...toastOptions,
          title: 'Signed out',
          description: 'See you later!',
        })
      }
    } catch (error) {
      dispatch({ type: SIGN_OUT_ERROR })
      toast.closeAll()
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to signed out',
        description: 'You might be offline.',
      })
    }
  }
}
