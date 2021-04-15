import { NextApiRequest, NextApiResponse } from 'next'
import { lowerCase } from 'lower-case'

import { verifyLicenseKey } from '@lib/api'

export default async function checkLicense(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.method === 'GET' &&
    req.query.token === process.env.PING_TOKEN &&
    req.query.key
  ) {
    try {
      const { data } = await verifyLicenseKey({
        permalink: `catamyst-${lowerCase(String(req.query.plan))}`,
        key: req.query.key,
      })
      if (!data.success) throw new Error('Invalid.')
      res.status(200).json({
        message: 'license_key is valid.',
        ...data,
      })
    } catch (error) {
      res.status(401).json({
        message: 'license_key is invalid.',
        success: false,
        error: error.stack ? error.message : error,
      })
    }
  } else {
    res.status(403).json({ message: 'Not allowed' })
  }
}
