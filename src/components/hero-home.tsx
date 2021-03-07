import NextImage from 'next/image'
import { Heading, Stack, Flex, Text } from '@chakra-ui/react'
import { QuickSignUpForm } from '@components'

export default function HeroHome() {
  return (
    <Flex px={5} justify="center">
      <Stack
        id="hero-home"
        align="center"
        width="100%"
        maxW="1200px"
        px={{ base: 0, lg: 5 }}
        py={{ base: '10', md: '20', lg: '30' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Stack maxW="40rem" spacing={5}>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', xl: '6xl' }}
            maxW="30ch"
            bgGradient="linear(to-r, teal.500, green.500)"
            bgClip="text"
          >
            All-in-one platform to learn software development
          </Heading>
          <Text fontSize={['md', 'lg']}>
            Learn coding and design from the very beginning. Build and showcase
            your projects as portfolio. Discuss ideas and ask questions with the
            community. Explore and post job opportunities.
          </Text>
          <QuickSignUpForm />
        </Stack>

        <NextImage
          alt="Evolution of cats"
          src="https://storage.catamyst.com/illustrations/hero-home.png"
          objectFit="contain"
          width={500}
          height={300}
        />
      </Stack>
    </Flex>
  )
}
