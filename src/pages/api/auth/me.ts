import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/lib'
import { getUser } from '@/lib/api'

/**
 * /api/auth/me
 * Similar with /api/auth/profile
 * But very simple, just for HeaderUser
 */
export default async function getAuthMe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getUser(req.headers.authorization)
    // console.warn({ user })

    // 'id,handle,name,avatar_url'
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(
        `id,handle,name,nickname,mode,role,plan,is_public,is_verified,avatar_url,cover_url,headline,bio_html,country,location,website_url,work,socials,pro,super,created_at,updated_at`
      )
      .eq('id', user.id)
      .single()
    if (profileError) throw profileError

    res.status(200).json({
      message: 'Get profile by authenticated id',
      profile,
    })
  } catch (error) {
    /**
     * Don't change status as useAuthProfileSWR use this.
     */
    res.status(401).json({
      message: 'Failed to get profile by authenticated id',
      isError: true,
      error,
    })
  }
}
