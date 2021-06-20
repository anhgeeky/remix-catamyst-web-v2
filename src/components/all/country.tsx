import Flag from 'react-flagkit'
import { HStack } from '@chakra-ui/react'

import { dataCountries } from '@/data'
import { Icon } from '@/components'

export function Country({ code, showName = true }) {
  const country = dataCountries.find((country) => country.code === code)

  if (country?.code === 'EARTH') {
    return (
      <HStack>
        <img
          src={`https://storage.catamyst.com/flags/EARTH.svg`}
          alt="Earth"
          width={21}
          height={14}
        />
        {showName && <span>Earth</span>}
      </HStack>
    )
  }
  if (country?.code === 'MOON') {
    return (
      <HStack>
        <Icon name="moon" />
        {showName && <span>Moon</span>}
      </HStack>
    )
  }
  if (country?.code === 'MARS') {
    return (
      <HStack>
        <img
          src={`https://storage.catamyst.com/flags/MARS.svg`}
          alt="Mars"
          width={21}
          height={14}
        />
        {showName && <span>Mars</span>}
      </HStack>
    )
  }
  if (country?.code && country?.name) {
    return (
      <HStack>
        <Flag country={country.code} size={20} alt={country.name} />
        {showName && <span>{country.name}</span>}
      </HStack>
    )
  }
  return null
}
