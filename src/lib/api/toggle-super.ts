import { supabase } from '@lib'
import { supabaseAdmin } from '@lib/api'

/**
 * Toggle Super-related fields in profile.
 */
export const toggleSuper = async (req, res, data) => {
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
     * Upgrade user to Super if the person email already exist.
     */
    if (user) {
      const { data: updatedProfile, error } = await supabaseAdmin
        .from('profiles')
        .update({
          plan: 'Super',
          super: {
            email: data.purchase.email,
            license_key: data.purchase.license_key,
            sessions_quota: 150,
          },
        })
        .eq('id', user[0]) // user.id in auth.users
        .single()
      if (error) throw error
      const response = {
        message: 'Super plan is activated.',
        via: 'ping',
        success: true,
        email: data.purchase.email,
        updatedProfile: {
          plan: updatedProfile.plan,
          super: updatedProfile.super,
        },
      }
      console.info(response)
      res.status(200).json(response)
    }
  } catch (error) {
    const response = {
      message: 'Failed to activate Super plan.',
      via: 'ping',
      success: false,
      body: req.body,
      error: error,
    }
    console.error(response)
    res.status(500).json(response)
  }
}
