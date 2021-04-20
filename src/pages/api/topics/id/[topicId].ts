import { NextApiRequest, NextApiResponse } from 'next'

// import { supabase } from '@lib'
import { dataTopics } from '@data'

export default async function topicId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { topicId } = req.query
  try {
    const topic = dataTopics.find((topic) => topic.id === Number(topicId))
    res.status(200).json(topic)
  } catch (error) {
    res.status(404).json({ message: 'Topic not found' })
  }
}
