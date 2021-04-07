import { NextApiRequest, NextApiResponse } from 'next'

import { verifyLicenseKey, supabaseAdmin } from '@lib/api'

/**
 * 1. Verify license_key based on permalink
 * 2. Get user.id by email from data.purchase
 * 3. Toggle Pro plan with data.purchase
 *
 * Should later handle if the authenticated user is different with
 * the email in data purchase.
 */
export default async function applyProPlan(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST' && req.body.license_key) {
    try {
      // 1. Verify
      const { data } = await verifyLicenseKey({
        permalink: 'catamyst-pro',
        key: req.body.license_key,
      })

      if (data) {
        // 2. Get user.id
        const { data: user, error: userError } = await supabaseAdmin.rpc(
          'get_user_by_email',
          {
            input: data.purchase.email,
          }
        )
        if (userError) throw userError

        // 3. Toggle Pro
        const { data: updatedProfile, error } = await supabaseAdmin
          .from('profiles')
          .update({
            plan: 'Pro',
            pro: {
              email: data.purchase.email,
              license_key: data.purchase.license_key,
              subscription_id: data.purchase.subscription_id,
            },
          })
          .eq('id', user[0]) // user.id in auth.users
          .single()
        if (error) throw error

        const response = {
          message: `Pro plan is activated`,
          success: true,
          via: 'apply',
          email: data.purchase.email,
        }
        console.info(response)
        res.status(200).json(response)
      }
    } catch (error) {
      const response = {
        message: 'Failed to activate Pro plan.',
        success: false,
        via: 'apply',
        body: req.body,
        error: error.stack ? error.message : error,
      }
      console.error(response)
      res.status(200).json(response)
    }
  } else {
    res.status(400).json({ message: 'Not allowed' })
  }
}
