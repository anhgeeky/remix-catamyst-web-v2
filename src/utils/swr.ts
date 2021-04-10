import useSWR from 'swr'
import axios from 'axios'

export { useSWR }

export const useUser = (userId) => {
  const { data, error } = useSWR(`/api/user/${userId}`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useProfile = (profileId) => {
  const { data, error } = useSWR(`/api/profiles/${profileId}`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export const fetcherWithToken = async (url, token) => {
  const response = await axios.get(url, { headers: { Authorization: token } })
  return response.data
}
