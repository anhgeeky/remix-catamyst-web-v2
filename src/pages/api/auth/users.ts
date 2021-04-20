import { NextApiRequest, NextApiResponse } from 'next'

import { supabaseAdmin, getUser } from '@lib/api'

/**
 * /api/auth/users
 */
export default async function getAuthUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // const isAuthorized = req.query.api_key === process.env.ADMIN_TOKEN
      const user = await getUser(req.headers.authorization)

      const { data, error } = await supabaseAdmin.rpc('get_users')
      if (error) throw error

      res.status(200).json({
        message: 'All users',
        user: user,
        users: data,
      })
    } catch (error) {
      res.status(401).json({
        message: 'Failed to get all users',
        error,
      })
    }
  } else {
    res.status(403).json({
      message: 'Not allowed',
    })
  }
}
