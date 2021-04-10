import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function profiles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase
    .from('profiles')
    .select('id, handle, name, avatar_url, created_at, updated_at', {
      count: 'exact',
    })
    .order('created_at', { ascending: true })

  res.status(200).json({
    message: 'All profiles',
    data,
  })
}
