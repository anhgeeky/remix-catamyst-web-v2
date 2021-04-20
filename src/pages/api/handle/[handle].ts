import { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '@lib'

import { dataRestrictedHandles } from '@data'
import { dataUsers, dataOrganizations } from '@data'

export type ResponseProfile = {
  message: string
  type: 'user' | 'org'
  profile: object
}

export default async function handleProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const handle = String(req.query.handle)
  const isRestricted = dataRestrictedHandles.find((restrictedHandle) => {
    if (handle.toLowerCase() === restrictedHandle) return true
  })

  try {
    /**
     * Check restricted handles
     */
    if (isRestricted) {
      res.status(404).json({
        message: 'Profile not found',
      })
    } else {
      /**
       * public.profiles
       */
      const { data: profile } = await supabase
        .from('profiles')
        .select(
          `handle, name, role, mode, plan, is_public, is_verified, avatar_url, cover_url, headline, bio_html, country, location, website_url, work, socials, created_at, updated_at`
        )
        .ilike('handle', `%${handle}%`)
        .single()

      if (profile) {
        res.status(200).json({
          message: 'User found from API',
          type: 'user',
          profile: profile,
        })
      }

      if (!profile) {
        /**
         * users.json
         */
        const userJSON = dataUsers.find((user) => user.handle === handle)
        if (userJSON) {
          res.status(200).json({
            message: 'User found from JSON',
            type: 'user',
            profile: userJSON,
          })
        }

        if (!profile && !userJSON) {
          /**
           * public.organizations
           */
          const { data: organization } = await supabase
            .from('organizations')
            .select(
              `handle, name, is_public, is_verified, logo_url, cover_url, headline, bio_html, country, location, website_url, socials, created_at, updated_at`
            )
            .eq('handle', handle)
            .single()

          if (organization) {
            res.status(200).json({
              message: 'Org found from API',
              type: 'org',
              profile: organization,
            })
          }

          if (!organization) {
            /**
             * organizations.json
             */
            const organizationJSON = dataOrganizations.find(
              (org) => org.handle === handle
            )
            if (organizationJSON) {
              res.status(200).json({
                message: 'Org found from JSON',
                type: 'org',
                profile: organizationJSON,
              })
            }

            if (!organizationJSON) {
              throw new Error('Profile not found anywhere.')
            }
          }
        }
      }
    }
  } catch (error) {
    res.status(404).json({
      message: 'Profile not found.',
    })
  }
}
