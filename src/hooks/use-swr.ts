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
 * SWR should only return data, loading, error.
 */
export const useAuthProfileSWR = (fields = 'id') => {
  try {
    const session = supabase.auth.session()
    if (!session) throw new Error('No session')

    // Be careful when setting up the key.
    const { data, error } = useSWR(
      [`/api/auth/me?fields=${fields}`, session?.access_token || null],
      fetcherWithToken
    )

    return {
      profile: data?.profile,
      isLoading: !error && !data,
      isError: error,
    }
  } catch (error) {
    return {
      profile: null,
      isLoading: false,
      isError: false,
    }
  }
}
