import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'qs'

import { supabase } from '@lib'

export default async function pingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req)

  if (req.method === 'POST') {
    try {
      const { body } = req
      const { data: createdPing, error } = await supabase
        .from('pings')
        .insert({ data: req.body })
      if (error) throw error
      res.status(200).json({ body, createdPing })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: error,
      })
    }
  } else {
    res.status(200).json({
      message: 'Not allowed',
    })
  }
}
