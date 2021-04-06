import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'qs'

import { supabaseAdmin } from '@lib/api'

export default async function pingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.info({ body: req.body })
    if (req.body.permalink === 'catamyst-pro') {
      await handleTogglePro(req, res)
    } else if (req.body.permalink === 'catamyst-super') {
      await handleToggleSuper(req, res)
    } else {
      res.status(200).json({ message: 'Not allowed' })
    }
  } else {
    res.status(200).json({ message: 'Not allowed' })
  }
}

const handleTogglePro = async (req, res) => {
  try {
    const { data: user, error } = await supabaseAdmin.rpc('get_user_by_email', {
      input: req.body.email,
    })
    if (error) throw error

    if (user) {
      const { data: updatedProfile, error } = await supabaseAdmin
        .from('profiles')
        .update({ plan: 'Pro', pro: { license_key: req.body.license_key } })
        .eq('id', user[0]) // user.id from auth.users
        .single()
      if (error) throw error

      const response = {
        user: { plan: updatedProfile.plan, pro: updatedProfile.pro },
      }
      console.info(response)
      res.status(200).json(response)
    }
  } catch (error) {
    const response = { body: req.body, error: error }
    console.error(response)
    res.status(500).json(response)
  }
}

const handleToggleSuper = async (req, res) => {
  try {
    const { data: user, error } = await supabaseAdmin.rpc('get_user_by_email', {
      input: req.body.email,
    })
    if (error) throw error

    if (user) {
      const { data: updatedProfile, error } = await supabaseAdmin
        .from('profiles')
        .update({ plan: 'Super', super: { license_key: req.body.license_key } })
        .eq('id', user[0]) // user.id from auth.users
        .single()
      if (error) throw error

      const response = {
        user: { plan: updatedProfile.plan, super: updatedProfile.super },
      }
      console.info(response)
      res.status(200).json(response)
    }
  } catch (error) {
    const response = { body: req.body, error: error }
    console.error(response)
    res.status(500).json(response)
  }
}
