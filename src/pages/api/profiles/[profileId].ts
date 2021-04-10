import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function profileById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { profileId } = req.query
  const { data: profile } = await supabase
    .from('profiles')
    .select(
      `id,
       handle,
       name,
       nickname,
       avatar_url,
       cover_url,
       headline,
       bio_html,
       country,
       location,
       website_url,
       work,
       socials,
       organizations,
       tracks,
       posts,
       projects,
       discussions,
       jobs_applied,
       jobs_posted,
       mentors,
       is_public,
       is_verified,
       language,
       timezone,
       currency,
       role,
       mode,
       plan`
    )
    .eq('id', profileId)
    .single()

  res.status(200).json(profile)
}
