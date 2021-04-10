import useSWR from 'swr'
import axios from 'axios'

export { useSWR }

export const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export const fetcherWithToken = async (url, token) => {
  const response = await axios.get(url, { headers: { Authorization: token } })
  return response.data
}
