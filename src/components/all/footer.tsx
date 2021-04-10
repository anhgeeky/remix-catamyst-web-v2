import NextLink from 'next/link'
import {
  Box,
  useColorModeValue,
  Code,
  Heading,
  Stack,
  VStack,
  Text,
  Link,
  List,
  ListItem,
  Flex,
} from '@chakra-ui/react'

import dataPackage from '../../../package.json'
import { SocialLinks } from '@components'
import { getYear, getDayNamePeriod } from '@utils'
import { dataAppSitemap } from '@data'

const NODE_ENV = process.env.NODE_ENV
const API_URL = process.env.NEXT_PUBLIC_API_URL

export function Footer() {
  return (
    <VStack
      as="footer"
      mt={200}
      p={10}
      spacing={10}
      color={useColorModeValue('gray.600', 'gray.100')}
    >
      <FooterSitemap />
      <SocialLinks />
      <FooterExtra />
    </VStack>
  )
}

export function FooterSitemap() {
  return (
    <Flex flexWrap="wrap">
      {dataAppSitemap.map((column) => {
        return (
          <Stack key={column.text} align="flex-start" minW="120px" mb={5}>
            <Heading as="h4" size="md">
              {column.text}
            </Heading>
            <List spacing={1} width="100%">
              {column.links.map((link) => {
                if (link.isEnabled !== false) {
                  return (
                    <ListItem key={link.text}>
                      <NextLink href={link.path} passHref>
                        <Link _hover={{ color: 'teal.500' }}>{link.text}</Link>
                      </NextLink>
                    </ListItem>
                  )
                }
              })}
            </List>
          </Stack>
        )
      })}
    </Flex>
  )
}

export function FooterExtra() {
  const year = getYear()
  const dayNamePeriod = getDayNamePeriod()

  return (
    <Box textAlign="center">
      <Text>
        Copyright{' '}
        <NextLink href="/cms/overview">
          <a>©</a>
        </NextLink>{' '}
        {year} Catamyst.
      </Text>
      <VStack opacity={0.5} fontSize={15} spacing={0}>
        <Text>Enjoy your {dayNamePeriod}!</Text>
        <Code colorScheme="white" fontWeight="700">
          v{dataPackage.version}
        </Code>
        {NODE_ENV !== 'production' && process.env.VERCEL && (
          <Code colorScheme="white" fontWeight="700">
            {NODE_ENV} && {API_URL}
          </Code>
        )}
      </VStack>
    </Box>
  )
}
