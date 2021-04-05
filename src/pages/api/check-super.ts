import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'qs'

export default async function checkSuperLicenseKey(
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
        product_permalink: 'catamyst-super',
        license_key: req.query.key,
      }),
    }
    try {
      // @ts-ignore
      const { data } = await axios(config)
      console.log(data)

      res.status(200).json({
        message: 'Super license key is valid.',
        success: data.success,
        license_key: data.purchase.license_key,
        created_at: data.purchase.created_at,
        recurrence: data.purchase.recurrence,
        referrer: data.purchase.referrer,
        refunded: data.purchase.refunded,
        ip_country: data.purchase.ip_country,
        subscription: {
          ended_at: data.purchase.subscription_ended_at,
          cancelled_at: data.purchase.subscription_cancelled_at,
          failed_at: data.purchase.subscription_failed_at,
        },
        data: data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Super license key is invalid.',
        success: false,
      })
    }
  } else {
    res.status(200).json({
      message: 'Not allowed',
    })
  }
}
