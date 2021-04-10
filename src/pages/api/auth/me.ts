import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import { getUser } from '@lib/api'

export default async function profileById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getUser(req.headers.authorization)
    const fields = String(req.query.fields) || 'id,handle,name,avatar_url'
    const { data: profile } = await supabase
      .from('profiles')
      .select(fields)
      .eq('id', user.id)
      .single()

    res.status(200).json({
      message: 'Get profile by id',
      profile,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to get profile by id',
    })
  }
}
