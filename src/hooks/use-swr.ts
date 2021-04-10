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
