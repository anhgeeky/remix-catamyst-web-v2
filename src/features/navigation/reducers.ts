import {
  NAVIGATE_TRACKS,
  // NAVIGATE_DISCUSSIONS,
  // NAVIGATE_POSTS,
  // NAVIGATE_PROJECTS,
  // NAVIGATE_JOBS,
  // NAVIGATE_MENTORS,
  // NAVIGATE_CERTIFICATES,
} from '@/features/navigation/types'

const initialState = {}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case NAVIGATE_TRACKS: {
      return state
    }
    default:
      return state
  }
}
