import Flag from 'react-flagkit'
import { HStack } from '@chakra-ui/react'

import dataCountries from '@data/countries.json'

export function Country({ code }) {
  const country = dataCountries.find((country) => country.code === code)

  if (country.code === 'EARTH') {
    return (
      <HStack>
        <img
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/icons/EARTH.svg`}
          alt="Earth"
          width={21}
          height={14}
        />
        <span>Earth</span>
      </HStack>
    )
  }
  if (country.code && country.name) {
    return (
      <HStack>
        <Flag country={country.code} size={20} />
        <span>{country.name}</span>
      </HStack>
    )
  }
  return (
    <HStack>
      <i>Unknown</i>
    </HStack>
  )
}
