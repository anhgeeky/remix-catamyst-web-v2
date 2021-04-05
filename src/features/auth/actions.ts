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
            { id: user!.id, updated_at: new Date() },
            { returning: 'minimal' }
          )
        if (error) throw error
        dispatch({ type: SIGN_UP_SUCCESS })
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

    try {
      // Sign in via Supabase/API
      let { user, error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      })
      if (error) throw error
      if (user) {
        // Get user's profile as well
        let { data, error } = await supabase
          .from('profiles')
          .select(`avatar_url, handle, name`)
          .eq('id', user!.id)
          .single()
        /**
         * Apply profile to Redux store auth.profile
         * So it's fast to display it in components
         */
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: data,
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
      const { error } = await supabase.auth.signOut()
      if (!error) {
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
