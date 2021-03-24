import NextImage from 'next/image'
import { Heading, Stack, Flex } from '@chakra-ui/react'

import { HomeCTA } from '@components/home'

export function HomeVillain() {
  return (
    <Flex px={5} justify="center">
      <Stack id="villain" align="center" textAlign="center" spacing={0}>
        <Heading
          as="h1"
          size="xl"
          maxW={{ base: '18rem', md: '25rem' }}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl', xl: '5xl' }}
          bgGradient="linear(to-r, teal.400, green.400)"
          bgClip="text"
        >
          Ready for your journey in tech?
        </Heading>
        <NextImage
          priority
          alt="Multiple cats learning"
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/hero-last-desktop.png`}
          objectFit="contain"
          width={500}
          height={300}
        />
        <HomeCTA />
      </Stack>
    </Flex>
  )
}
