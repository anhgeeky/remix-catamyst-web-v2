import { supabase } from '@lib'
import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Pro-related fields in profile.
 */
export const upgradePro = async (req, res, userId) => {
  console.info(`>>> userId: ${userId}`)

  try {
    const { data: newProfileData, error: newProfileError } = await supabaseAdmin
      .from('profiles')
      .update({
        plan: 'Pro',
        pro: {
          email: req.body.email || '',
          license_key: req.body.license_key || '',
          subscription_id: req.body.subscription_id || '',
        },
      })
      .eq('id', userId)
      .single()
    if (newProfileError) {
      console.error('>>> Error when upsert profile to pro')
      throw newProfileError
    }

    const response = {
      message: 'Pro plan is activated.',
      email: req.body.email,
      via: 'ping',
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
      body: req.body,
      newProfileError: newProfileError,
    }
    console.error('>>>', { response })
    res.status(500).json(response)
  }
}
