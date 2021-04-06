import { supabase } from '@lib'
import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Pro-related fields in profile.
 */
export const togglePro = async (req, res, data) => {
  try {
    const { data: user, error } = await supabaseAdmin.rpc('get_user_by_email', {
      input: data.purchase.email,
    })

    /**
     * Create new user if user by email is not found.
     */
    if (error) {
      let { user } = await supabase.auth.signUp({
        email: data.purchase.email.toLowerCase(),
      })
      const response = { message: 'Created a new account', user }
      console.log(response)
      res.status(200).json(response)
    }

    /**
     * Upgrade user to Pro if the person email already exist.
     */
    if (user) {
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
        message: 'Pro plan is activated.',
        email: data.purchase.email,
        via: 'ping',
        updatedProfile: {
          plan: updatedProfile.plan,
          pro: updatedProfile.pro,
        },
      }
      console.info(response)
      res.status(200).json(response)
    }
  } catch (error) {
    const response = {
      message: 'Failed to activate Pro plan.',
      via: 'ping',
      success: false,
      body: req.body,
      error: error,
    }
    console.error(response)
    res.status(500).json(response)
  }
}
