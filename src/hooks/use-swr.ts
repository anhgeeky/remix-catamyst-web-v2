import useSWR, { mutate as mutateSWR } from 'swr'

/**
 * If possible, avoid calling Supabase in SWR.
 * It could cause a hard to track bugs.
 */

export { useSWR, mutateSWR }

export const fetcherSWR = (url) => fetch(url).then((res) => res.json())

export const fetcherWithTokenSWR = async (url, token) => {
  const response = await fetch(url, {
    headers: { Authorization: `${token}` },
  })
  return response.json()
}

export const useProfileSWR = (profileId) => {
  const { data, error } = useSWR(`/api/profiles/${profileId}`, fetcherSWR)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

/**
 * Only attempt to request with SWR if there is a session token.
 * SWR should only return data, loading, error.
 */
export const useAuthProfileSWR = (token) => {
  // Be careful when setting up the key.
  const { data, error } = useSWR(
    token ? [`/api/auth/me`, token] : null,
    fetcherWithTokenSWR
  )

  return {
    profile: data?.profile,
    isLoading: !error && !data,
    isError: Boolean(!data),
    error: error,
  }
}
