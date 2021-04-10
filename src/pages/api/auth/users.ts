import { NextApiRequest, NextApiResponse } from 'next'

import { supabaseAdmin, getUser } from '@lib/api'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  // const isAuthorized = req.query.api_key === process.env.PING_TOKEN

  if (req.method === 'GET') {
    try {
      const user = await getUser(req.headers.authorization)

      const { data, error } = await supabaseAdmin.rpc('get_users')
      if (error) throw error

      res.status(200).json({
        message: 'All users',
        user: user,
        users: data,
      })
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get all users',
        error,
      })
    }
  } else {
    res.status(400).json({
      message: 'Not allowed',
    })
  }
}
