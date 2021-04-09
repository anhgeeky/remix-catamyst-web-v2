import { NextApiRequest, NextApiResponse } from 'next'

// import { supabase } from '@lib'
import dataTracks from '@data/tracks.json'

export default async function getProfileById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { trackId } = req.query
  try {
    const track = dataTracks.find((track) => track.id === Number(trackId))
    res.status(200).json(track)
  } catch (error) {
    res.status(404).json({ message: 'Track not found' })
  }
}
