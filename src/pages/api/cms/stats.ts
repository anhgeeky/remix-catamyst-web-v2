import { NextApiRequest, NextApiResponse } from 'next'

import dataUsers from '@data/users.json'
import dataTracks from '@data/tracks.json'
import dataTopics from '@data/topics.json'
import dataLessons from '@data/lessons.json'

export default async function lessons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dataStats = [
      { label: 'Users', total: dataUsers.length, href: '/cms/users' },
      { label: 'Tracks', total: dataTracks.length, href: '/cms/tracks' },
      { label: 'Topics', total: dataTopics.length, href: '/cms/topics' },
      { label: 'Lessons', total: dataLessons.length, href: '/cms/lessons' },
    ]

    res.status(200).json({
      message: 'Get all stats',
      stats: dataStats,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get all stats',
    })
  }
}
