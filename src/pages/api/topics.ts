import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataTopics from '@data/topics.json'

export default async function topics(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { data, error } = await supabase
    //   .from('topics')
    //   .select('id, title, slug, category, level, is_published', {
    //     count: 'exact',
    //   })
    res.status(200).json({
      message: 'Get all topics',
      topics: dataTopics,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get all topics',
    })
  }
}
