import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'qs'

export default async function checkProLicenseKey(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET' && req.query.key) {
    const config = {
      method: 'POST',
      url: 'https://api.gumroad.com/v2/licenses/verify',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify({
        increment_uses_count: false,
        product_permalink: 'catamyst-pro',
        license_key: req.query.key,
      }),
    }
    try {
      // @ts-ignore
      const { data } = await axios(config)
      res.status(200).json({
        message: 'Pro license key is valid.',
        created_at: data.purchase.created_at,
        license_key: data.purchase.license_key,
        recurrence: data.purchase.recurrence,
        referrer: data.purchase.referrer,
        success: data.success,
        ip_country: data.purchase.ip_country,
        data: data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Pro license key is invalid.',
        success: false,
      })
    }
  } else {
    res.status(200).json({
      message: 'Not allowed',
    })
  }
}