import { createStandaloneToast } from '@chakra-ui/react'
import useSWR, { mutate } from 'swr'

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
const toastOptions = {
  isClosable: true,
  duration: 1000,
}

/**
 * Sign up with email and password.
 */
export const signUp = (form) => {
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
        email: form.email.toLowerCase(),
        password: form.password,
      })
      if (error) throw error
      if (user) {
        /**
         * Create profile automatically
         */
        let { data, error } = await supabase
          .from('profiles')
          .upsert({ id: user!.id, name: form.name })
          .single()
        if (error) throw error
        if (data) {
          /**
           * Apply the new profile to Redux store auth.profile
           */
          dispatch({ type: SIGN_UP_SUCCESS })
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
        email: data.email.toLowerCase(),
        password: data.password,
      })
      if (error) throw error
      if (user) {
        /**
         * Get user's profile is done via SWR.
         */
        if (error) throw error
        if (data) {
          mutate(`/api/auth/me?fields=id,handle,name,avatar_url`)

          /**
           * Apply profile to Redux store auth.profile
           */

          dispatch({ type: SIGN_IN_SUCCESS })

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
        description: `Invalid email or password. Please try again.`,
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
        email: email.toLowerCase(),
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
 * Still needed to change auth.isAuthenticated so the HeaderUser is changed.
 */
export const signOut = () => {
  return async (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
    supabase.auth.signOut()

    /**
     * There will be the actual sign out process with API.
     */
    try {
      dispatch({ type: SIGN_OUT_SUCCESS })
      mutate(`/api/auth/me?fields=id,handle,name,avatar_url`)

      toast.closeAll()
      toast({
        ...toastOptions,
        title: 'Signed out',
        description: 'See you later!',
      })
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
