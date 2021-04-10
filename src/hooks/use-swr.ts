import axios from 'axios'
import useSWR from 'swr'

import { supabase } from '@lib'
export { useSWR }

export const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export const fetcherWithToken = async (url, token) => {
  const response = await axios.get(url, { headers: { Authorization: token } })
  return response.data
}

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
 * But only attempt to request with SWR if there is a session token.
 * SWR should only return data, loading, error.
 */
export const useAuthProfileSWR = (fields = 'id', token) => {
  try {
    // Be careful when setting up the key.
    const { data, error } = useSWR(
      token ? [`/api/auth/me?fields=${fields}`, token] : null,
      fetcherWithToken
    )
    if (error) throw error

    return {
      profile: data?.profile,
      isLoading: !error && !data,
      isError: Boolean(error),
    }
  } catch (error) {
    // console.error(error.message)
    return {
      profile: null,
      isLoading: false,
      isError: true,
      error: error,
    }
  }
}
