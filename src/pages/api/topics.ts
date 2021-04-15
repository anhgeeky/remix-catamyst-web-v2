import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataTopics from '@data/topics.json'

export default async function topics(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({
      message: 'Get all topics',
      topics: dataTopics,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get all topics',
    })
  }
}
