import Flag from 'react-flagkit'
import { HStack } from '@chakra-ui/react'

import { dataAppCountries } from '@data'

export function Country({ code }) {
  const country = dataAppCountries.find((country) => country.code === code)

  if (country?.code === 'EARTH') {
    return (
      <HStack>
        <img
          src={`https://storage.catamyst.com/flags/EARTH.svg`}
          role="flag"
          alt="Earth"
          width={21}
          height={14}
        />
        <span>Earth</span>
      </HStack>
    )
  }
  if (country?.code === 'MARS') {
    return (
      <HStack>
        <img
          src={`https://storage.catamyst.com/flags/MARS.svg`}
          role="flag"
          alt="Mars"
          width={21}
          height={14}
        />
        <span>Mars</span>
      </HStack>
    )
  }
  if (country?.code && country?.name) {
    return (
      <HStack>
        <Flag country={country.code} role="flag" size={20} alt={country.name} />
        <span>{country.name}</span>
      </HStack>
    )
  }
  return null
}
