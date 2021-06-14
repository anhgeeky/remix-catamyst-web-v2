import { NextApiRequest, NextApiResponse } from 'next'

import { supabaseAdmin } from '@/lib/api'

/**
 * Toggle Pro-related fields in profile.
 */
export const upgradePro = async (
  req: NextApiRequest,
  res: NextApiResponse,
  profile,
  lifetime = false
) => {
  // console.info('>>> Upgrade Pro', { profile })

  try {
    const { data: newProfileData, error: newProfileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: profile.id,
        plan: 'Pro',
        pro: {
          email: req.body?.email || '',
          license_key: req.body?.license_key || '',
          subscription_id: req.body?.subscription_id || '',
          lifetime: lifetime,
        },
      })
      .single()
    if (newProfileError) {
      console.error('>>> Error when upsert profile to pro')
      throw newProfileError
    }

    const response = {
      message: 'Pro plan is activated.',
      via: 'ping',
      success: true,
      profile: profile,
      newProfileData: {
        plan: newProfileData.plan,
        pro: newProfileData.pro,
      },
    }
    console.info(response)
    res.status(200).json(response)
  } catch (newProfileError) {
    const response = {
      message: 'Failed to activate Pro plan.',
      via: 'ping',
      success: false,
      profile: profile,
      newProfileError: newProfileError,
    }
    console.error('>>>', { response })
    res.status(401).json(response)
  }
}
