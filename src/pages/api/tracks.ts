import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataTracks from '@data/tracks.json'

export default async function tracks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { data, error } = await supabase
    //   .from('tracks')
    //   .select('id, title, slug, category, level, is_published', {
    //     count: 'exact',
    //   })
    res.status(200).json({
      message: 'Get all tracks',
      tracks: dataTracks,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get all tracks',
    })
  }
}
