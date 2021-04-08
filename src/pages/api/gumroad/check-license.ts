import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'qs'

import { verifyLicenseKey } from '@lib/api'

export default async function checkLicense(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method === 'GET' &&
    // req.query.type
    req.query.token === process.env.PING_TOKEN &&
    req.query.key
  ) {
    try {
      const { data } = await verifyLicenseKey({
        permalink: `catamyst-${req.query.type}`,
        key: req.query.key,
      })
      if (!data.success) throw new Error('Invalid.')
      res.status(200).json({
        message: 'license_key is valid.',
        ...data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'license_key is invalid.',
        success: false,
      })
    }
  } else {
    res.status(400).json({ message: 'Not allowed' })
  }
}
