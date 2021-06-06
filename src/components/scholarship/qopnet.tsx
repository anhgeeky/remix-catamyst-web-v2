import NextHead from 'next/head'
import {
  chakra,
  Flex,
  Box,
  VStack,
  Stack,
  Button,
  Heading,
  Link,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import Iframe from 'react-iframe'

import { Icon, NextImage } from '@components'
import { ScholarshipHero } from '@components/scholarship'

export function ScholarshipQopnet() {
  const [isTooSmall] = useMediaQuery('(max-width: 920px)')

  return (
    <>
      <NextHead>
        <title>
          Software Engineering Scholarship · Sponsored by Qopnet · Catamyst
        </title>
      </NextHead>

      <ScholarshipHero>
        <Stack
          id="hero-texts-image"
          direction={isTooSmall ? 'column' : 'row'}
          spacing={20}
        >
          <Stack id="hero-texts" spacing={5}>
            <Heading as="h1" size={isTooSmall ? '3xl' : '4xl'}>
              <Stack justify={['center', 'flex-start']}>
                <chakra.span>Software</chakra.span>
                <chakra.span>Engineering</chakra.span>
                <chakra.span color="#00aaaa">Scholarship</chakra.span>
              </Stack>
            </Heading>

            <Heading as="h2" size="lg">
              <Stack
                align={isTooSmall ? 'flex-start' : 'center'}
                direction={isTooSmall ? 'column' : 'row'}
                spacing={3}
              >
                <chakra.span>Sponsored by</chakra.span>
                <Flex align="center">
                  <Link isExternal href="https://qopnet.id">
                    <NextImage
                      className="next-image"
                      src="https://ik.imagekit.io/catamyst/logos/qopnet-logo.png"
                      alt="Qopnet logo"
                      width={192}
                      height={60}
                    />
                  </Link>
                </Flex>
              </Stack>
            </Heading>

            <Stack mt={10}>
              <Flex align="center" fontSize="xl">
                <Icon name="date" />
                <Text ml={3}>Apply before 1 August 2021</Text>
              </Flex>

              <Flex align="center" fontSize="xl">
                <Icon name="users" />
                <Text ml={3}>Limited to 2–3 people only</Text>
              </Flex>
            </Stack>
          </Stack>

          <VStack spacing={10}>
            <NextImage
              className="invertable next-image"
              src="https://ik.imagekit.io/catamyst/images/cats-scholarship.png"
              alt="Cats scholarship"
              width={330}
              height={275}
            />
            <Box>
              <Button
                leftIcon={<Icon name="form" />}
                size="lg"
                colorScheme="orange"
              >
                Apply Now
              </Button>
            </Box>
          </VStack>
        </Stack>
      </ScholarshipHero>

      <VStack>
        <Box>
          <Button
            isExternal
            as={Link}
            leftIcon={<Icon name="external" />}
            href="https://airtable.com/shrFUZjGN57bZIKfc"
            colorScheme="orange"
          >
            Open form in new tab
          </Button>
        </Box>

        <Box width="100%" maxW={760} boxShadow="base">
          <Iframe
            id="qopnet-form"
            className="iframe airtable-embed airtable-dynamic-height"
            url="https://airtable.com/embed/shrFUZjGN57bZIKfc"
            width="100%"
            height="533px"
          />
        </Box>
      </VStack>
    </>
  )
}
