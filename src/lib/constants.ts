export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const DEFAULT_AVATARS_BUCKET = 'avatars'
export const DEFAULT_COVERS_BUCKET = 'covers'

export type Profile = {
  id: string
  handle: string
  name: string
  avatar_url: string
  website_url: string
}
