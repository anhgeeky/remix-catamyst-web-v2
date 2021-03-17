import NextLink from 'next/link'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import ReactHtmlParser from 'react-html-parser'

import { Card, Country, SocialLinks, TrimmedURL, Icon } from '@components'
import { transformOptions } from '@components/blocks'
import dataReviews from '@data/reviews-featured.json'

export function HomeReviews() {
  return (
    <VStack spacing={10} p={5} maxW={1200} width="100%">
      <VStack textAlign="center" maxW="40rem">
        <Heading
          as="h1"
          size="2xl"
          bgClip="text"
          bgGradient="linear(to-r, teal.400, green.400)"
        >
          What our members say
        </Heading>
        <Text as="h2" fontSize="xl">
          Their reviews on the experience with Catamyst.
        </Text>
      </VStack>

      <VStack width="100%">
        <SimpleGrid
          spacing={5}
          width="100%"
          minChildWidth={{ base: 280, sm: 400 }}
        >
          {dataReviews.map((user) => {
            return (
              <Card
                key={user.handle}
                as={VStack}
                direction="column"
                spacing={3}
                justify="space-between"
                align="flex-start"
              >
                <Stack spacing={3}>
                  <HStack spacing={5}>
                    <Avatar src={user.avatarUrl} alt={user.name} size="xl" />
                    <Box>
                      <Heading as="h3" size="lg">
                        <NextLink href={`/${user.handle}`}>
                          <a>{user.name}</a>
                        </NextLink>
                      </Heading>
                      <Box>
                        {user.title}
                        {user.organization?.name && (
                          <>
                            <span> at </span>
                            <Link isExternal href={user.organization.url}>
                              {user.organization.name}
                            </Link>
                          </>
                        )}
                      </Box>
                      <Country code={user.countryCode} />
                    </Box>
                  </HStack>

                  <Stack spacing={5} align="space-between">
                    <blockquote cite={`https://catamyst.com/${user.handle}`}>
                      <Box
                        position="relative"
                        fontSize="7xl"
                        left={-2}
                        opacity={0.5}
                        color={useColorModeValue('gray.300', 'gray.600')}
                      >
                        <Icon name="quote-left" />
                      </Box>
                      <Box position="relative" mt={-16}>
                        {ReactHtmlParser(user.review.html, transformOptions)}
                      </Box>
                    </blockquote>
                  </Stack>
                </Stack>

                <HStack>
                  <SocialLinks links={user.socialLinks} />
                  <Link
                    isExternal
                    href={user.websiteUrl}
                    color="teal.500"
                    fontWeight="bold"
                  >
                    <TrimmedURL url={user.websiteUrl} />
                  </Link>
                </HStack>
              </Card>
            )
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}
