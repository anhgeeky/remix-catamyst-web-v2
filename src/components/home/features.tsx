import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  Heading,
  Text,
  VStack,
  Stack,
  Link,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'

import { LinkButton, Icon } from '@components'
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
        <Text as="h2" fontSize="lg">
          Catamyst provide the essentials for your career journey.
        </Text>
      </VStack>

      {/* <VStack width="100%"> */}
      <SimpleGrid spacing={5} width="100%" minChildWidth={280}>
        {dataFeatures.map((feature) => {
          return (
            <NextLink key={feature.slug} href={feature.href} passHref>
              <Link
                p={5}
                rounded="md"
                boxShadow="xs"
                cursor="pointer"
                bg={useColorModeValue('white', 'gray.800')}
                direction={{ base: 'column', sm: 'row' }}
                _hover={{ boxShadow: 'outline', textDecoration: 'none' }}
              >
                <Stack direction="column" align="center">
                  <NextImage
                    className="invertable next-image"
                    src={`https://storage.catamyst.com/illustrations/${feature.imageName}`}
                    objectFit="contain"
                    layout="fixed"
                    height={100}
                    width={100}
                  />
                  <Heading as="h3" size="lg" textAlign="center">
                    {feature.name}
                  </Heading>
                </Stack>
                <Text>{feature.description}</Text>
              </Link>
            </NextLink>
          )
        })}
      </SimpleGrid>
      {/* </VStack> */}

      <VStack>
        <Stack direction={{ base: 'column', sm: 'row' }}>
          {!isAuthenticated && (
            <>
              <LinkButton
                href="/signup"
                colorScheme="teal"
                leftIcon={<Icon name="star" />}
              >
                Awesome, I want them
              </LinkButton>
            </>
          )}
          {isAuthenticated && (
            <>
              <LinkButton
                href="/dashboard/overview"
                colorScheme="teal"
                leftIcon={<Icon name="learn" />}
              >
                Continue my journey
              </LinkButton>
              <LinkButton
                href="/pricing"
                colorScheme="yellow"
                leftIcon={<Icon name="star" />}
              >
                Upgrade my account
              </LinkButton>
            </>
          )}
        </Stack>
      </VStack>
    </VStack>
  )
}
