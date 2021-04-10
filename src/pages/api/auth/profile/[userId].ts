import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function profileById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query
  const { data: profile } = await supabase
    .from('profiles')
    .select(`id, handle, name, avatar_url`)
    .eq('id', userId)
    .single()

  res.status(200).json({
    message: 'Get profile by id',
    profile,
  })
}
