const fs = require('fs')
const dataCountries = require('./countries.json')
const sorted = dataCountries.sort((a, b) => (a.name > b.name ? 1 : -1))

const data = JSON.stringify(sorted)
fs.writeFileSync('sorted.json', data)
