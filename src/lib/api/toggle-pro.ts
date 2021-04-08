import { supabase } from '@lib'
import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Pro-related fields in profile.
 */
export const togglePro = async (req, res, userId) => {
  try {
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        plan: 'Pro',
        pro: {
          email: req.body.email || '',
          license_key: req.body.license_key || '',
          subscription_id: req.body.subscription_id || '',
        },
      })
      .single()
    if (profileError) throw profileError

    const response = {
      message: 'Pro plan is activated.',
      email: req.body.email,
      via: 'ping',
      profileData: {
        plan: profileData.plan,
        pro: profileData.pro,
      },
    }
    console.info(response)
    res.status(200).json(response)
  } catch (profileError) {
    const response = {
      message: 'Failed to activate Pro plan.',
      via: 'ping',
      success: false,
      body: req.body,
      profileError: profileError,
    }
    console.error(response)
    res.status(500).json(response)
  }
}
