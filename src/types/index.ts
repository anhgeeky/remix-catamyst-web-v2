export type Profile = {
  handle?: string
  id: string
  name?: string
  nickname?: string
  mode: string
  role: string
  plan: string
  is_public: boolean
  is_verified: boolean
  avatar_url?: string
  cover_url?: string
  headline?: string
  bio_html?: string
  country?: string
  location?: string
  website_url?: string
  work?: any | null
  socials?: any | [] | null
  pro?: any | null
  super?: any | null
  created_at?: string
  updated_at?: string
  // discussions: null
  // jobs_applied: null
  // jobs_posted: null
  // mentors: null
  // organizations: null
  // posts: null
  // projects: null
  // tracks: null
}
