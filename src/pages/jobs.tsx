import Head from 'next/head'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@/layouts'

export default function Jobs() {
  return (
    <LayoutDefault title="Job vacancies">
      <Heading as="h1" size="xl">
        Jobs
      </Heading>
    </LayoutDefault>
  )
}
