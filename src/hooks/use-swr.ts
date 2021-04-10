import useSWR, { mutate as mutateSWR } from 'swr'

/**
 * Named exports
 */

export { useSWR, mutateSWR }

/**
 * Fetchers
 * @param url
 * @param token
 * @returns json
 */

export const fetcherSWR = (url) => fetch(url).then((res) => res.json())

export const fetcherWithTokenSWR = async (url, token) => {
  const response = await fetch(url, {
    headers: { Authorization: `${token}` },
  })
  return response.json()
}

/**
 * Hooks
 */

export const useProfileSWR = (profileId) => {
  const { data, error } = useSWR(`/api/profiles/${profileId}`, fetcherSWR)
  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  }
}

/**
 * Only attempt to request with SWR if there is a session token.
 * SWR should only return data, loading, error.
 */
export const useAuthProfileSWR = (token) => {
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
