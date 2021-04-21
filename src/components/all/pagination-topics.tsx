import NextLink from 'next/link'
import { Flex, Stack, Link, Text, useColorModeValue } from '@chakra-ui/react'
import {
  ArrowUpIcon as UpIcon,
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'

import { TopicIconTitleSpan } from '@components/topics'

export function PaginationTopics({ track, prev, next }) {
  return (
    <Stack
      as="nav"
      my={5}
      spacing={0}
      justify="space-between"
      direction={['column', 'row']}
    >
      {prev?.slug ? (
        <PaginationLink
          label="Previous"
          textAlign="left"
          href={`/learn/${track.slug}/${prev.slug}`}
        >
          <PreviousIcon /> <TopicIconTitleSpan topic={prev} />
        </PaginationLink>
      ) : (
        <PaginationLink
          label="Up"
          textAlign="left"
          href={`/learn/${track.slug}`}
        >
          <UpIcon /> {track.title}
        </PaginationLink>
      )}

      {next?.slug ? (
        <PaginationLink
          label="Next"
          textAlign="right"
          href={`/learn/${track.slug}/${next.slug}`}
        >
          <TopicIconTitleSpan topic={next} /> <NextIcon />
        </PaginationLink>
      ) : (
        <PaginationLink
          label="Up"
          textAlign="right"
          href={`/learn/${track.slug}`}
        >
          {track.title} <UpIcon />
        </PaginationLink>
      )}
    </Stack>
  )
}

function PaginationLink({ label, href, textAlign, children }) {
  return (
    <NextLink href={href} passHref>
      <Link
        label={label}
        textAlign={textAlign}
        rounded="md"
        p={2}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.100', 'gray.800'),
        }}
      >
        <Text fontSize="md" fontWeight="700" color="teal.400">
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}
