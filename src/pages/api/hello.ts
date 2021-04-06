// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dataPackage from '../../../package.json'
import { dataHeroHome } from '@data'

export default (req, res) => {
  res.statusCode = 200
  res.json({
    name: 'Catamyst',
    version: `v${dataPackage.version}`,
    ...dataHeroHome,
  })
}
