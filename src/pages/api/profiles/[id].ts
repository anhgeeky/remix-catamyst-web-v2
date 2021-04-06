import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function getProfileById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', id)
    .single()

  res.status(200).json(profile)
}
