import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Super-related fields in profile.
 */
export const upgradeSuper = async (req, res, userId) => {
  console.info(`>>> userId: ${userId}`)

  try {
    const { data: currentData, error: currentError } = await supabaseAdmin
      .from('profiles')
      .select('super')
      .eq('id', userId)
      .single()
    if (currentError) throw currentError

    const variant = String(req.body['variants[Hours]'])
    const quota = Number(variant.split(' ')[0])

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        plan: 'Super',
        super: currentData?.super
          ? {
              email: req.body.email || '',
              license_key: req.body.license_key || '',
              sale_timestamp: req.body.sale_timestamp || '',
              variants: req.body['variants[Hours]'] || '',
              sessions_quota: currentData.super.sessions_quota + quota || 0,
              updated_at: new Date(),
            }
          : {
              email: req.body.email || '',
              license_key: req.body.license_key || '',
              sale_timestamp: req.body.sale_timestamp || '',
              variants: req.body['variants[Hours]'] || '',
              sessions_quota: quota || 0,
              updated_at: new Date(),
            },
      })
      .single()
    if (profileError) {
      console.error('>>> Error when upsert profile to super')
      throw profileError
    }

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
    console.error('>>>', { response })
    res.status(500).json(response)
  }
}
