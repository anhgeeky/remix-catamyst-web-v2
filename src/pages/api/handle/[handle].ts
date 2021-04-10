import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'
import dataUsers from '@data/users.json'
import dataOrganizations from '@data/organizations.json'

export default async function handleProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { handle } = req.query
  try {
    /**
     * public.profiles
     */
    const { data: userData } = await supabase
      .from('profiles')
      .select(
        `handle, name, role, mode, plan, is_public, is_verified, avatar_url, cover_url, headline, bio_html, country, location, website_url, work, socials, created_at, updated_at`
      )
      .eq('handle', handle)
      .single()

    if (userData) {
      res.status(200).json({
        message: 'User found from API',
        type: 'user',
        profile: userData,
      })
    }

    if (!userData) {
      /**
       * users.json
       */
      const user = dataUsers.find((user) => user.handle === handle)
      if (user) {
        res.status(200).json({
          message: 'User found from JSON',
          type: 'user',
          profile: user,
        })
      }

      if (!userData && !user) {
        /**
         * public.organizations
         */
        const { data: orgData } = await supabase
          .from('organizations')
          .select(
            `handle, name, is_public, is_verified, logo_url, cover_url, headline, bio_html, country, location, website_url, socials, created_at, updated_at`
          )
          .eq('handle', handle)
          .single()

        if (orgData) {
          res.status(200).json({
            message: 'Org found from API',
            type: 'org',
            profile: orgData,
          })
        }

        if (!orgData) {
          /**
           * organizations.json
           */
          const org = dataOrganizations.find((org) => org.handle === handle)
          if (org) {
            res.status(200).json({
              message: 'Org found from JSON',
              type: 'org',
              profile: org,
            })
          }

          if (!org) throw new Error('Profile not found.')
        }
      }
    }
  } catch (error) {
    res.status(404).json({ message: 'Profile not found.' })
  }
}
