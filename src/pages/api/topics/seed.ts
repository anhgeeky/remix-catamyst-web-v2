import { NextApiRequest, NextApiResponse } from 'next'

import { seedTopics } from '@lib/api'

/**
 * Seed topics from JSON into database.
 * Also purge existing data first.
 */
export default async function apiTopicsSeed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST' && req.query.token === process.env.SEED_TOKEN) {
    try {
      const { data, error } = await seedTopics()
      if (error) throw error

      res.status(200).json({
        message: 'Seeded all topics',
        length: data.length,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Failed to seed topics',
        error,
      })
    }
  } else {
    res.status(403).json({
      message: 'Not allowed',
    })
  }
}
