import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase.from('lessons').select('*')
    if (error) throw error

    res.status(200).json({
      message: 'Get all lessons',
      lessons: data,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get all lessons',
      error,
    })
  }
}
