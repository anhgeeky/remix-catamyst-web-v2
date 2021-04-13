import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Super-related fields in profile.
 */
export const upgradeSuper = async (req, res, userId) => {
  console.info(`>>> userId: ${userId}`)

  try {
    const {
      data: currentProfile,
      error: currentProfileError,
    } = await supabaseAdmin
      .from('profiles')
      .select('super')
      .eq('id', userId)
      .single()
    if (currentProfileError) {
      console.error('>>> Error when select profile by userId')
      throw currentProfileError
    }

    const variant = String(req.body['variants[Hours]'])
    const quota = Number(variant.split(' ')[0])

    const { data: newProfileData, error: newProfileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        plan: 'Super',
        super: currentProfile?.super
          ? {
              email: req.body.email || '',
              license_key: req.body.license_key || '',
              sale_timestamp: req.body.sale_timestamp || '',
              variants: req.body['variants[Hours]'] || '',
              sessions_quota: currentProfile.super.sessions_quota + quota || 0,
            }
          : {
              email: req.body.email || '',
              license_key: req.body.license_key || '',
              sale_timestamp: req.body.sale_timestamp || '',
              variants: req.body['variants[Hours]'] || '',
              sessions_quota: quota || 0,
            },
      })
      .eq('id', userId)
      .single()
    if (newProfileError) {
      console.error('>>> Error when upsert profile to super')
      throw newProfileError
    }

    const response = {
      message: 'Super plan is activated.',
      via: 'ping',
      success: true,
      email: req.body.email,
      newProfileData: {
        plan: newProfileData.plan,
        super: newProfileData.super,
      },
    }
    console.info(response)
    res.status(200).json(response)
  } catch (newProfileError) {
    const response = {
      message: 'Failed to activate Super plan.',
      via: 'ping',
      success: false,
      body: req.body,
      newProfileError: newProfileError,
    }
    console.error('>>>', { response })
    res.status(500).json(response)
  }
}
