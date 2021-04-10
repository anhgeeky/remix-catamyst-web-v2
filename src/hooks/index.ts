export { useAuth } from '@hooks/use-auth'
export { usePaginationLessons } from '@hooks/use-pagination-lessons'
export { usePaginationTopics } from '@hooks/use-pagination-topics'
export { useProfile } from '@hooks/use-profile'
export { useRedirectDashboard } from '@hooks/use-redirect-dashboard'
export { useRedirectSignIn } from '@hooks/use-redirect-signin'
export { useRouteChanged } from '@hooks/use-route-changed'
export { useToast } from '@hooks/use-toast'
export { useUserSession } from '@hooks/use-user-session'
export { useAppDispatch, useAppSelector } from '@hooks/use-redux'

/**
 * Name convention for all SWR-relate to easily identify.
 */
export {
  useSWR,
  useProfileHandleSWR,
  useAuthProfileSWR,
  fetcherSWR,
  fetcherWithTokenSWR,
  mutateSWR,
} from '@hooks/use-swr'
