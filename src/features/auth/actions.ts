import { createStandaloneToast } from '@chakra-ui/react'

import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_MAGIC_BEGIN,
  SIGN_IN_MAGIC_ERROR,
  SIGN_IN_MAGIC_SUCCESS,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
} from '@features/auth/types'
import { supabase } from '@lib'

const toast = createStandaloneToast()
const toastOptions = { isClosable: true, duration: 3000 }

/**
 * Sign up with email and password.
 */
export const signUp = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_UP_BEGIN })
    /**
     * There will be the actual sign up process with API.
     */
    try {
      /**
       * Create new user with email and password
       */
      let { user, error } = await supabase.auth.signUp({
        email: data.email.toLowerCase(),
        password: data.password,
      })
      if (error) throw error
      if (user) {
        /**
         * Create profile automatically
         */
        let { data, error } = await supabase
          .from('profiles')
          .upsert({ id: user!.id })
        if (error) throw error
        if (data) {
          /**
           * Apply the new profile to Redux store auth.profile
           */
          dispatch({ type: SIGN_UP_SUCCESS, payload: data })
          toast.closeAll()
          toast({
            ...toastOptions,
            status: 'success',
            title: 'Signed up.',
            description: 'Welcome onboard!',
          })
        }
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

/**
 * Sign in with email and password.
 */
export const signIn = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_IN_BEGIN })
    try {
      /**
       * Sign in via Supabase/API
       */
      let { user, error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      })
      if (error) throw error
      if (user) {
        /**
         * Get user's profile as well
         */
        let { data, error } = await supabase
          .from('profiles')
          .select(`avatar_url, handle, name`)
          .eq('id', user!.id)
          .single()
        if (error) throw error
        if (data) {
          /**
           * Apply profile to Redux store auth.profile
           */
          dispatch({ type: SIGN_IN_SUCCESS, payload: data })
          toast.closeAll()
          toast({
            ...toastOptions,
            status: 'success',
            title: 'Signed in.',
            description: 'Welcome back!',
          })
        }
      }
    } catch (error) {
      dispatch({ type: SIGN_IN_ERROR })
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to sign in.',
        description: `${error.message}. Please try again.`,
      })
    }
  }
}

/**
 * Sign in passwordless with magic link sent to email.
 */
export const signInMagic = (email) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_IN_MAGIC_BEGIN })
    try {
      const { error, user } = await supabase.auth.signIn({
        email: email,
      })
      if (error) throw error
      if (user) {
        dispatch({ type: SIGN_IN_MAGIC_SUCCESS })
        toast.closeAll()
      }
    } catch (error) {
      dispatch({ type: SIGN_IN_MAGIC_ERROR })
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to sign in.',
        description: `${error.message}. Please try again.`,
      })
    }
  }
}

/**
 * Sign out session.
 */
export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
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
        description: `${error.message}. Please try again.`,
      })
    }
  }
}
