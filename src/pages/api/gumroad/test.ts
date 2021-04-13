import { NextApiRequest, NextApiResponse } from 'next'

import { supabaseAdmin } from '@lib/api'

export default async function testHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Need to convert first before using toLowerCase
  const email = String(req.body.email)

  try {
    const { data: users, error: userError } = await supabaseAdmin.rpc(
      'get_user_by_email',
      {
        input: email.toLowerCase(),
      }
    )
    if (userError) {
      console.info('>>> Error when getting user by email')
      throw userError
    }
    const response = { users, userId: users[0] }
    console.info(response)
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(200).json({ error })
  }
}
