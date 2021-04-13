import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import { supabaseAdmin, upgradePro, upgradeSuper } from '@lib/api'
import { getPlan } from '@utils'

/**
 * Handle Gumroad Ping webhook.
 */
export default async function gumroadPing(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Need to convert first before using toLowerCase
  const profile = {
    id: '',
    email: String(req.body.email),
  }

  if (req.method === 'POST' && req.query.token === process.env.PING_TOKEN) {
    try {
      // Set userId either from existing user (database) or new user (sign up)
      // let userId
      // users[0]

      if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
        console.info(req.body)
      }

      /**
       * 1. Get existing profile.id by email.
      // CAUTION: Only use get_user_by_email in API/backend
       */
      const { data: users, error: userError } = await supabaseAdmin.rpc(
        'get_user_by_email',
        {
          input: profile.email.toLowerCase(),
        }
      )
      profile.id = users[0]
      console.info({ profile })

      /**
       * 2. Create new user if user by email is not found.
       */
      if (userError) {
        console.info('>>> Error when getting user by email')
        let { user } = await supabase.auth.signUp({
          email: profile.email.toLowerCase(),
        })
        const response = { message: 'Created a new account', user }
        console.info(response)
      }

      /**
       * 3. Insert ping data into new row of customers table.
       * Don't update/upsert, because we want to store all history.
       */
      const { error: customerError } = await supabaseAdmin
        .from('customers')
        .insert(
          {
            // id is auto generated
            user_id: profile.id,
            customer_id: profile.email || '',
            plan: getPlan(req.body.permalink) || 'Pro',
            data: req.body || {},
          },
          { returning: 'minimal' }
        )
        .single()
      if (customerError) {
        console.error('>>> customerError')
        throw customerError
      }

      /**
       * 4. Determine and update corresponding profile.plan data
       */
      if (req.body.permalink === 'catamyst-pro') {
        await upgradePro(req, res, profile.id)
      } else if (req.body.permalink === 'catamyst-pro-lifetime') {
        await upgradePro(req, res, profile.id)
      } else if (req.body.permalink === 'catamyst-super') {
        await upgradeSuper(req, res, profile.id)
      } else {
        res.status(400).json({ message: 'Not allowed' })
      }

      // TODO: Ping could handle cancellation event here
      // But only check after the next billing cycle
    } catch (error) {
      const response = {
        message: 'Failed to upgrade because of mixed problems.',
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
