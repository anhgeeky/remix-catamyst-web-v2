import axios from 'axios'
import qs from 'qs'

export const verifyLicenseKey = async ({ key, permalink }) => {
  return await axios({
    method: 'POST',
    url: 'https://api.gumroad.com/v2/licenses/verify',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      increment_uses_count: false,
      product_permalink: permalink,
      license_key: key,
    }),
  })
}
