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
import { dataAppSitemap } from '@data'
import { useAuth } from '@hooks'
import { getYear, getDayNamePeriod, isDev, isProd, isVercel } from '@utils'

const NODE_ENV = process.env.NODE_ENV
const API_URL = process.env.NEXT_PUBLIC_API_URL

export function Footer() {
  return (
    <VStack
      as="footer"
      mt={100}
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
  const { isAuthenticated } = useAuth()

  return (
    <Flex flexWrap="wrap">
      {dataAppSitemap.map((column, index) => {
        return (
          <Stack key={column.text} align="flex-start" minW="120px" mb={5}>
            <Heading as="h4" size="md">
              {column.text}
            </Heading>
            <List spacing={1} width="100%">
              {column.links.map((link, index) => {
                if (link.hasOwnProperty('isAuthenticated')) {
                  if (
                    link.hasOwnProperty('isAuthenticated') &&
                    link.isAuthenticated === isAuthenticated
                  ) {
                    return <FooterListItem key={link.path} link={link} />
                  }
                } else if (link.isEnabled === true) {
                  return <FooterListItem key={link.path} link={link} />
                }
              })}
            </List>
          </Stack>
        )
      })}
    </Flex>
  )
}

export function FooterListItem({ link }) {
  return (
    <ListItem key={link.text}>
      <NextLink href={link.path} passHref>
        <Link _hover={{ color: 'teal.500' }}>{link.text}</Link>
      </NextLink>
    </ListItem>
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
          v{dataPackage.version} {!isProd && NODE_ENV}
        </Code>
        {isDev && isVercel && (
          <Code colorScheme="white" fontWeight="700">
            {NODE_ENV} && {API_URL}
          </Code>
        )}
      </VStack>
    </Box>
  )
}
