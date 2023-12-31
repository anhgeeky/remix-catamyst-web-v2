import useSWR, { mutate as mutateSWR } from 'swr'
// import { useDispatch } from 'react-redux'
// import { supabase } from '@/lib'
// import { signOut } from '@/features/auth/actions'

/**
 * Named exports
 */

export { useSWR, mutateSWR }

/**
 * Fetchers for SWR with fetch/axios.
 * @param url
 * @param token
 *
 * No need for try catch, should be returned when { data, error } is called.
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

/**
 * Using req.headers.authorization
 * @param url
 * @param token
 * @returns
 */
export const fetcherWithTokenSWR = async (url, accessToken) => {
  const res = await fetch(url, {
    headers: { Authorization: accessToken },
  })

  if (!res.ok) {
    const error = new Error('Fetch with accessToken error.')
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}

/**
 * Hooks for profile-related data.
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
  /**
   * Attempt to request with session.access_token.
   */
  const { data, error } = useSWR(
    token ? ['/api/auth/me', token] : null,
    fetcherWithTokenSWR
  )

  return {
    profile: data?.profile,
    isLoading: !error && !data,
    isError: Boolean(!data),
    error: error,
  }
}

/**
 * Hooks for content-related data.
 */

export const useUsers = () => {
  const { data, error } = useSWR('/api/users', fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useProfiles = () => {
  const { data, error } = useSWR('/api/profiles', fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useTrackById = (id) => {
  const { data, error } = useSWR(`/api/tracks/id/${id}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useTrackBySlug = (slug) => {
  const { data, error } = useSWR(`/api/tracks/slug/${slug}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

/**
 * Topics
 */

export const useTopics = () => {
  const { data, error } = useSWR(`/api/topics`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useTopicById = (id) => {
  const { data, error } = useSWR(`/api/topics/id/${id}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useTopicBySlug = (slug) => {
  const { data, error } = useSWR(`/api/topics/slug/${slug}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

/**
 * Lessons
 */

export const useLessons = (accessToken) => {
  const { data, error } = useSWR(
    ['/api/lessons', accessToken],
    fetcherWithTokenSWR
  )

  return { data: data, isLoading: !error && !data, isError: error }
}

export const useLessonById = (id) => {
  const { data, error } = useSWR(`/api/lessons/id/${id}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useLessonBySlug = (slug) => {
  const { data, error } = useSWR(`/api/lessons/slug/${slug}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}

export const useLessonsByQuery = (query) => {
  const { data, error } = useSWR(`/api/lessons?q=${query}`, fetcherSWR)
  return { data: data, isLoading: !error && !data, isError: error }
}
