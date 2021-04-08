import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import { supabaseAdmin, togglePro, toggleSuper } from '@lib/api'

/**
 * Handle Gumroad Ping webhook.
 */
export default async function pingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST' && req.query.token === process.env.PING_TOKEN) {
    try {
      process.env.NODE_ENV === 'production' && console.info(req.body)
      let userId

      // 1. Get existing user.id by email.
      const { data: users, error: userError } = await supabaseAdmin.rpc(
        'get_user_by_email',
        {
          input: req.body.email.toLowerCase(),
        }
      )
      userId = users[0]

      // 2. Create new user if user by email is not found.
      if (userError) {
        let { user } = await supabase.auth.signUp({
          email: req.body.email.toLowerCase(),
        })
        userId = user.id
        const response = { message: 'Created a new account', user }
        console.info(response)
      }

      // 3. Upsert ping data into customers table.
      const { error: customerError } = await supabaseAdmin
        .from('customers')
        .upsert(
          { id: userId, customer_id: req.body.email, data: req.body },
          { returning: 'minimal' }
        )
        .single()
      if (customerError) throw customerError

      // 4. Determine and update corresponding profile.plan fields
      if (req.body.permalink === 'catamyst-pro') {
        await togglePro(req, res, userId)
      } else if (req.body.permalink === 'catamyst-pro-lifetime') {
        await togglePro(req, res, userId)
      } else if (req.body.permalink === 'catamyst-super') {
        await toggleSuper(req, res, userId)
      } else {
        res.status(400).json({ message: 'Not allowed' })
      }

      // TODO Ping could handle cancellation event here
    } catch (error) {
      const response = {
        message: 'Failed to verify license_key.',
        via: 'ping',
        success: false,
        body: req.body,
        error: error.stack ? error.message : error,
      }
      console.error(response)
      res.status(400).json(response)
    }
  } else {
    res.status(400).json({ message: 'Not allowed' })
  }
}
