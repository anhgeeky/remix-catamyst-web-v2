import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import { dataTracks, dataTopics } from '@data'

export default async function trackId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { trackId } = req.query
  try {
    const track = dataTracks.find((track) => track.id === Number(trackId))
    const topics = dataTopics.filter((topic) => {
      return track.topics.includes(topic.id)
    })

    res.status(200).json({
      message: 'Track by id',
      id: trackId,
      track,
      topics,
    })
  } catch (error) {
    res.status(404).json({
      message: 'Track not found',
    })
  }
}
