import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await supabase.from('profiles').select()

  res.status(200).json(data)
}
