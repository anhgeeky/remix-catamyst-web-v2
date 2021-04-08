import { supabase } from '@lib'
import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Super-related fields in profile.
 */
export const upgradeSuper = async (req, res, userId) => {
  try {
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        plan: 'Super',
        super: {
          email: req.body.email || '',
          license_key: req.body.license_key || '',
          sessions_quota: 150,
        },
      })
      .single()
    if (profileError) throw profileError

    const response = {
      message: 'Super plan is activated.',
      via: 'ping',
      success: true,
      email: req.body.email,
      profileData: {
        plan: profileData.plan,
        super: profileData.super,
      },
    }
    console.info(response)
    res.status(200).json(response)
  } catch (profileError) {
    const response = {
      message: 'Failed to activate Super plan.',
      via: 'ping',
      success: false,
      body: req.body,
      profileError: profileError,
    }
    console.error(response)
    res.status(500).json(response)
  }
}
