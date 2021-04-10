import { createStandaloneToast } from '@chakra-ui/react'

import { mutateSWR } from '@hooks'

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
      console.error({ error })
      dispatch({ type: SIGN_UP_ERROR })
      toast({
        ...toastOptions,
        status: 'error',
        title: 'Failed to sign up. Please try again',
        description: 'You might already have an account.',
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
      let { user, error } = await supabase.auth.signIn({
        email: data.email.toLowerCase(),
        password: data.password,
      })
      if (error) throw error
      if (user) {
        if (error) throw error
        if (data) {
          mutateSWR('/api/auth/me')
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
      console.error({ error })
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
      console.error({ error })
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
export const signOut = (notify = true) => {
  return async (dispatch) => {
    dispatch({ type: SIGN_OUT_BEGIN })
    supabase.auth.signOut()
    try {
      dispatch({ type: SIGN_OUT_SUCCESS })
      mutateSWR('/api/auth/me')
      toast.closeAll()
      notify &&
        toast({
          ...toastOptions,
          title: 'Signed out',
          description: 'See you later!',
        })
    } catch (error) {
      console.error({ error })
      dispatch({ type: SIGN_OUT_ERROR })
      toast.closeAll()
      notify &&
        toast({
          ...toastOptions,
          status: 'error',
          title: 'Failed to signed out',
          description: `${error.message}. Please try again.`,
        })
    }
  }
}
