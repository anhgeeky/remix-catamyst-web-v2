import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select(
        'id,slug,title,level,category,blocks,is_published,created_at,updated_at'
      )
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
