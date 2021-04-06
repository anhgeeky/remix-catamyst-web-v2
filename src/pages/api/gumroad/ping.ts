import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'qs'

export default async function pingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log(req)
    res.status(200).json({
      body: req.body,
    })
  } else {
    res.status(200).json({
      message: 'Not allowed',
    })
  }
}
