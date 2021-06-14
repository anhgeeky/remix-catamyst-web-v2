import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@/lib'
import { getUser } from '@/lib/api'

/**
 * /api/auth/profile
 */
export default async function getAuthProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getUser(req.headers.authorization)

    const { data: profile } = await supabase
      .from('profiles')
      .select(
        'id,handle,name,nickname,mode,role,plan,is_public,is_verified,avatar_url,cover_url,headline,bio_html,country,location,website_url,work,socials,pro,super,created_at,updated_at'
      )
      .eq('id', user.id)
      .single()

    res.status(200).json({
      message: 'Get profile by id',
      profile,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get profile by id',
    })
  }
}
