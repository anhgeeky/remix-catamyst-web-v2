import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.q) {
    const { data, error } = await supabase
      .from('lessons')
      .select('id,slug,title,level,category,is_published,created_at,updated_at')
      .ilike('title', `%${req.query.q}%`)
    if (error) throw error

    res.status(200).json({
      message: 'Get lessons by query',
      query: req.query,
      lessons: data,
    })
  } else {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(
          'id,slug,title,level,category,is_published,created_at,updated_at'
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
}
