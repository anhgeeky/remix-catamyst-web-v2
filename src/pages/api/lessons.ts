import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataLessons from '@data/lessons.json'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { data, error } = await supabase
    //   .from('lessons')
    //   .select('id, title, slug, category, level, is_published', {
    //     count: 'exact',
    //   })
    res.status(200).json({
      message: 'Get all lessons',
      lessons: dataLessons,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get all lessons',
    })
  }
}
