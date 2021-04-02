import { createStandaloneToast } from '@chakra-ui/react'

import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_PASSWORDLESS_BEGIN,
  SIGN_IN_PASSWORDLESS_ERROR,
  SIGN_IN_PASSWORDLESS_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from '@features/auth/types'
import dataDefaultUser from '@data/user.json'
import { supabase } from '@lib'

const toast = createStandaloneToast()
const toastOptions = {
  isClosable: true,
  duration: 1000,
  // variant: 'solid',
}

export const signUp = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_UP_BEGIN })
    toast({ title: 'Creating new account...' })
    /**
     * There will be the actual sign up process with API.
     */
    try {
      // Create user
      let { user, session, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
      if (error) throw error
      if (user) {
        // Create profile automatically
        let { error } = await supabase
          .from('profiles')
          .upsert(
            { id: user!.id, name: user.email, updated_at: new Date() },
            { returning: 'minimal' }
          )
        if (error) throw error
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { user: user },
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

export const signIn = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    toast({ title: 'Signing in...', duration: 1000, isClosable: true })
    /**
     * There will be the actual sign in process with API.
     */
    // console.log({ data })

    try {
      const { error, user } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      })
      // const user = 'DATA_IS_HERE'

      if (error) throw error
      if (user) {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: {
            user: user,
          },
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

export const signInPasswordless = (email) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_IN_PASSWORDLESS_BEGIN })
    toast({
      title: 'Signing in without password...',
      duration: 1000,
      isClosable: true,
    })
    // console.log({ email })

    try {
      const { error, user } = await supabase.auth.signIn({
        email: email,
      })
      if (error) throw error
      if (user) {
        dispatch({ type: SIGN_IN_PASSWORDLESS_SUCCESS })
        toast.closeAll()
      }
    } catch (error) {
      dispatch({ type: SIGN_IN_PASSWORDLESS_ERROR })
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to sign in.',
        description: 'Please try again and check your email.',
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
