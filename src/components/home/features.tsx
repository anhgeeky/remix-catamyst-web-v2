import NextImage from 'next/image'
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react'

import { LinkButton, Card } from '@components'
import { useAuth } from '@hooks'
import dataFeatures from '@data/features.json'

export function HomeFeatures() {
  const { isAuthenticated } = useAuth()

  return (
    <VStack spacing={10} p={5} maxW={1200} width="100%">
      <VStack textAlign="center" maxW="40rem">
        <Heading
          as="h1"
          size="2xl"
          bgClip="text"
          bgGradient="linear(to-r, teal.400, green.400)"
        >
          Supports you can get
        </Heading>
        <Text as="h2" fontSize="xl">
          Catamyst provide the essentials for your career journey.
        </Text>
      </VStack>

      <VStack width="100%">
        <SimpleGrid spacing={5} width="100%" minChildWidth={280}>
          {dataFeatures.map((feature) => {
            return (
              <Card key={feature.slug}>
                <Flex direction="column" align="center">
                  <NextImage
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/illustrations/${feature.imageName}`}
                    objectFit="contain"
                    layout="fixed"
                    height={100}
                    width={100}
                  />
                  <Heading as="h3">{feature.name}</Heading>
                </Flex>
                <Text>{feature.description}</Text>
              </Card>
            )
          })}
        </SimpleGrid>
      </VStack>

      <VStack>
        {!isAuthenticated && (
          <LinkButton href="/signup" size="lg" colorScheme="teal">
            Awesome, I'm in
          </LinkButton>
        )}
        {isAuthenticated && (
          <LinkButton href="/dashboard/overview" size="lg" colorScheme="teal">
            Continue my journey
          </LinkButton>
        )}
      </VStack>
    </VStack>
  )
}
