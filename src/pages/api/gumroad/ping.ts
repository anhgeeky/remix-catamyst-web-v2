import { NextApiRequest, NextApiResponse } from 'next'

import { verifyLicenseKey, togglePro, toggleSuper } from '@lib/api'

/**
 * Handle Gumroad Ping webhook.
 */
export default async function pingHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { data } = await verifyLicenseKey({
        permalink: req.body.permalink,
        key: req.body.license_key,
      })

      if (req.body.permalink === 'catamyst-pro') {
        await togglePro(req, res, data)
      } else if (req.body.permalink === 'catamyst-pro-lifetime') {
        await togglePro(req, res, data)
      } else if (req.body.permalink === 'catamyst-super') {
        await toggleSuper(req, res, data)
      } else {
        res.status(400).json({ message: 'Not allowed' })
      }

      // TODO Ping could handle cancellation event here
    } catch (error) {
      const response = {
        message: 'Failed to verify license key.',
        via: 'ping',
        success: false,
        body: req.body,
        error: error.stack ? error.message : error,
      }
      console.error(response)
      res.status(400).json(response)
    }
  } else {
    res.status(400).json({ message: 'Not allowed' })
  }
}
