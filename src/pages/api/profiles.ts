import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function profiles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase
    .from('profiles')
    .select('handle', { count: 'exact' })

  res.status(200).json({
    message: 'All profiles',
    data,
  })
}
