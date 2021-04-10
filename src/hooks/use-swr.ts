import axios from 'axios'
import useSWR from 'swr'
import qs from 'qs'

import { supabase } from '@lib'

export const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export const fetcherWithToken = async (url, token) => {
  const response = await axios.get(url, { headers: { Authorization: token } })
  return response.data
}

export { useSWR }

export const useUserSWR = (userId) => {
  const { data, error } = useSWR(`/api/user/${userId}`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useProfileSWR = (profileId) => {
  const { data, error } = useSWR(`/api/profiles/${profileId}`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

/**
 * Just focus on fetching with token.
 * But only attempt to request with SWR if there is a session.
 */
export const useAuthProfileSWR = (fields = 'id') => {
  console.info(`>>> SWR ${fields}`)

  try {
    const session = supabase.auth.session()
    if (!session) throw new Error('No session')

    const { data, error } = useSWR(
      [`/api/auth/me?fields=${fields || 'id'}`, session?.access_token || null],
      fetcherWithToken
    )
    if (error) throw error

    const isAuthenticated = Boolean(session)
    const isAuthorized =
      data?.profile?.role === 'Admin' ||
      data?.profile?.role === 'Staff' ||
      data?.profile?.role === 'Mentor'

    return {
      profile: data?.profile || null,
      isAuthenticated: isAuthenticated || false,
      isAuthorized: isAuthorized || false,
      isLoading: !error && !data?.profile,
      isError: error || false,
    }
  } catch (error) {
    return {
      profile: null,
      isAuthenticated: false,
      isAuthorized: false,
      isLoading: false,
      isError: false,
    }
  }
}
