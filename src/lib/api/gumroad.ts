import axios from 'axios'
import qs from 'qs'

export const verifyLicenseKey = async ({ permalink, key }) => {
  return await axios({
    url: 'https://api.gumroad.com/v2/licenses/verify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      increment_uses_count: false,
      product_permalink: permalink,
      license_key: key,
    }),
  })
}
