import { NextApiRequest, NextApiResponse } from 'next'

import { dataTracks } from '@/data'

export default async function tracks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({
      message: 'Get all tracks',
      tracks: dataTracks,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Failed to get all tracks',
    })
  }
}
