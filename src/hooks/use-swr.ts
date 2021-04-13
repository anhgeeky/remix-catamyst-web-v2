import useSWR, { mutate as mutateSWR } from 'swr'
import { useDispatch } from 'react-redux'

import { supabase } from '@lib'
import { signOut } from '@features/auth/actions'

/**
 * Named exports
 */

export { useSWR, mutateSWR }

/**
 * Fetchers
 * @param url
 * @param token
 */

export const fetcherSWR = async (url) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  if (!res.ok) {
    const error = new Error('Fetch error.')
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}

export const fetcherWithTokenSWR = async (url, token) => {
  const res = await fetch(url, {
    headers: { Authorization: `${token}` },
  })

  if (!res.ok) {
    const error = new Error('Fetch with token error.')
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}

/**
 * Hooks
 */

export const useProfileHandleSWR = (handle) => {
  const { data, error } = useSWR(`/api/handle/${handle}`, fetcherSWR)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useAuthProfileSWR = (token) => {
  const dispatch = useDispatch()
  // console.warn({ token })

  /**
   * Attempt to request with session.access_token.
   */
  const { data, error } = useSWR(
    token ? ['/api/auth/me', token] : null,
    fetcherWithTokenSWR
  )
  // console.warn({ data, error })

  /**
   * When user might have been deleted or signed out somewhere else.
   * FIXME: Could cause early signout when session is still revalidating.
   */
  if (error || data?.error === 401) {
    console.warn('Signing out because of expired session...')
    console.warn({ data, error })
    dispatch(signOut(false))
    supabase.auth.signOut()
    // This could happen when switching between development and production.
  }

  return {
    profile: data?.profile,
    isLoading: !error && !data,
    isError: Boolean(!data),
    error: error,
  }
}
