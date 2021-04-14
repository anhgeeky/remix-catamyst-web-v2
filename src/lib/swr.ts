import useSWR, { mutate as mutateSWR } from 'swr'

export const swrConfig = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404 error.
    if (error.status === 404) return
    // Only retry several times.
    if (retryCount >= 3) return
    // Retry after 3 seconds.
    setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 3000)
  },
}
