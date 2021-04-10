import NextImage from 'next/image'
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

import { Card, Country, SocialLinks, Icon } from '@components'
import { transformOptions } from '@components/blocks'
import { trimUrl } from '@utils'
import dataFeaturedReviews from '@data/reviews-featured.json'

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
        <Text as="h2" fontSize="lg">
          Their reviews on the experience with Catamyst.
        </Text>
      </VStack>

      <VStack width="100%">
        <SimpleGrid
          spacing={5}
          width="100%"
          minChildWidth={{ base: 280, sm: 400 }}
        >
          <UserReviews reviews={dataFeaturedReviews} />
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}

function UserReviews({ reviews }) {
  return (
    <>
      {reviews.map((user) => {
        if (user.isPublished !== false) {
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
                  <Box
                    className="next-image-avatar-container"
                    rounded="full"
                    bg={useColorModeValue('gray.100', 'gray.500')}
                  >
                    <NextImage
                      className="next-image-avatar"
                      src={user.avatar_url}
                      alt={user.name}
                      objectFit="cover"
                      layout="fixed"
                      width={100}
                      height={100}
                    />
                  </Box>
                  <Box>
                    <Heading as="h3" size="lg">
                      <NextLink href={`/${user.handle}`}>
                        <a>{user.name}</a>
                      </NextLink>
                    </Heading>
                    <Box>
                      <Text>
                        {user.title}
                        {user.organization?.name && (
                          <>
                            <span> at </span>
                            <Link isExternal href={user.organization.url}>
                              {user.organization.name}
                            </Link>
                          </>
                        )}
                      </Text>
                    </Box>
                    <Country code={user.country} />
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
                <SocialLinks links={user.socials} />
                <Link isExternal href={user.websiteUrl} color="teal.500">
                  {trimUrl(user.websiteUrl)}
                </Link>
              </HStack>
            </Card>
          )
        }
      })}
    </>
  )
}
