import { NextApiRequest, NextApiResponse } from 'next'
import { dataLessons } from '@data'

import { supabase } from '@lib'

export default async function seedLessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST' && req.query.token === process.env.SEED_TOKEN) {
    try {
      // Delete lessons
      await supabase.from('lessons').delete()
      // Insert lessons
      const { data, error } = await supabase.from('lessons').insert(dataLessons)
      if (error) throw error

      res.status(200).json({
        message: 'Seeded all lessons',
        lessons: data,
      })
    } catch (error) {
      res.status(404).json({ message: 'Failed to seed lessons', error })
    }
  } else {
    res.status(403).json({ message: 'Not allowed' })
  }
}
