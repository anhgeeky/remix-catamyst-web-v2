import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import { supabaseAdmin, upgradePro, upgradeSuper } from '@lib/api'
import { getPlan, isProd, isVercel } from '@utils'

/**
 * Handle Gumroad Ping webhook.
 */
export default async function gumroadPing(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Need to convert first before using strings and toLowerCase
  const profile = {
    id: '',
    email: String(req.body.email),
  }

  if (req.method === 'POST' && req.query.token === process.env.PING_TOKEN) {
    try {
      if (isProd && isVercel) {
        console.info({ body: req.body })
      }

      /**
       * 1. Get existing profile.id by email.
       */
      const { data: users, error: userError } = await supabaseAdmin.rpc(
        'get_user_by_email',
        {
          input: profile.email.toLowerCase(),
        }
      )
      profile.id = users[0]
      // console.info('>>> Get user by email', { profile })

      /**
       * 2. Create new user if user by email is not found.
       */
      if (!profile.id) {
        console.info('>>> Error when getting user by email')
        let { user } = await supabase.auth.signUp({
          email: profile.email.toLowerCase(),
        })
        const response = { message: 'Created a new account', user, profile }
        console.info(response)
      }

      /**
       * 3. Insert ping data into new row of customers table.
       * Don't update/upsert, because we want to store all history.
       */
      // console.info('>>> Before insert customer', { profile })
      const { error: customerError } = await supabaseAdmin
        .from('customers')
        .insert(
          {
            // FIXME: Why
            // id is auto generated
            customer_email: profile.email || '',
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
        await upgradePro(req, res, profile, false)
      } else if (req.body.permalink === 'catamyst-pro-lifetime') {
        await upgradePro(req, res, profile, true)
      } else if (req.body.permalink === 'catamyst-super') {
        await upgradeSuper(req, res, profile)
      } else {
        res.status(403).json({ message: 'Not allowed' })
      }

      // TODO: Ping could handle cancellation event here
      // But only check after the next billing cycle
      // Compare purchase date with the current date
    } catch (error) {
      const response = {
        message: 'Failed to upgrade because of few problems.',
        via: 'ping',
        success: false,
        profile: profile,
        error: error.stack ? error.message : error,
      }
      console.error(response)
      res.status(401).json(response)
    }
  } else {
    res.status(403).json({ message: 'Not allowed' })
  }
}
