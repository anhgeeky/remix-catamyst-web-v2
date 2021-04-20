import { NextApiRequest, NextApiResponse } from 'next'

import { seedLessons } from '@lib/api'

export default async function seed(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST' && req.query.token === process.env.SEED_TOKEN) {
    try {
      const { data, error } = await seedLessons()
      if (error) throw error
      res.status(200).json({
        message: 'Seeded all lessons',
        length: data.length,
      })
    } catch (error) {
      res.status(404).json({
        message: 'Failed to seed lessons',
        error,
      })
    }
  } else {
    res.status(403).json({
      message: 'Not allowed',
    })
  }
}
