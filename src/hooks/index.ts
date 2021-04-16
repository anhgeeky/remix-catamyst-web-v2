export { useAppDispatch, useAppSelector } from '@hooks/use-redux'
export { useAuth } from '@hooks/use-auth'
export { usePaginationLessons } from '@hooks/use-pagination-lessons'
export { usePaginationTopics } from '@hooks/use-pagination-topics'
export { useProfile } from '@hooks/use-profile'
export { useRedirectDashboard } from '@hooks/use-redirect-dashboard'
export { useRedirectHome } from '@hooks/use-redirect-home'
export { useRedirectOnboard } from '@hooks/use-redirect-onboard'
export { useRedirectSignIn } from '@hooks/use-redirect-signin'
export { useRouteChanged } from '@hooks/use-route-changed'
export { useToast } from '@hooks/use-toast'
export { useUserSession } from '@hooks/use-user-session'

/**
 * Name convention for all SWR-relate to easily identify.
 */
export {
  fetcherSWR,
  fetcherWithTokenSWR,
  mutateSWR,
  useAuthProfileSWR,
  useProfileHandleSWR,
  useSWR,
  useTrackById,
  useTrackBySlug,
} from '@hooks/use-swr'
