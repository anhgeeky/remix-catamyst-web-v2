import NextLink from 'next/link'
import {
  HStack,
  IconButton,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  ArrowUpIcon as UpIcon,
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'
import theme from '@/theme/theme.json'
import React from 'react'

export default function PaginationLessons({
  mode,
  track,
  topic,
  prev,
  next,
  children = undefined,
}) {
  if (mode === 'minimal') {
    return (
      <PaginationLessonsMinimal
        track={track}
        topic={topic}
        prev={prev}
        next={next}
      >
        {children}
      </PaginationLessonsMinimal>
    )
  }
  if (mode === 'full') {
    return (
      <PaginationLessonsFull
        track={track}
        topic={topic}
        prev={prev}
        next={next}
      />
    )
  }
  return null
}

/**
 * Pagination lessons mode minimal
 */

function PaginationLessonsMinimal({ track, topic, prev, next, children }) {
  return (
    <HStack
      as="nav"
      aria-label="Pagination lesson"
      width="100%"
      justify="space-between"
      maxW={theme.maxContentWidth}
    >
      {prev?.slug ? (
        <PaginationLinkMinimal
          label="Previous"
          href={`/learn/${track.slug}/${topic.slug}/${prev.slug}`}
          icon={<PreviousIcon />}
        />
      ) : (
        <PaginationLinkMinimal
          label="Up"
          href={`/learn/${track.slug}/${topic.slug}`}
          icon={<UpIcon />}
        />
      )}

      {children}

      {next?.slug ? (
        <PaginationLinkMinimal
          label="Next"
          href={`/learn/${track.slug}/${topic.slug}/${next.slug}`}
          icon={<NextIcon />}
        />
      ) : (
        <PaginationLinkMinimal
          label="Up"
          href={`/learn/${track.slug}/${topic.slug}`}
          icon={<UpIcon />}
        />
      )}
    </HStack>
  )
}

function PaginationLinkMinimal({ label, href, icon }) {
  return (
    <NextLink href={href} passHref>
      <IconButton
        as={Link}
        aria-label={label}
        icon={icon}
        rounded="md"
        variant="ghost"
      />
    </NextLink>
  )
}

/**
 * Pagination lessons mode full
 */

function PaginationLessonsFull({ track, topic, prev, next }) {
  return (
    <SimpleGrid
      as="nav"
      aria-label="Pagination lesson"
      width="100%"
      spacing={5}
      columns={2}
      maxW={theme.maxContentWidth}
    >
      {prev?.slug ? (
        <PaginationLinkFull
          label="Previous"
          textAlign="left"
          href={`/learn/${track.slug}/${topic.slug}/${prev.slug}`}
        >
          <PreviousIcon /> {prev.title}
        </PaginationLinkFull>
      ) : (
        <PaginationLinkFull
          label="Up"
          textAlign="left"
          href={`/learn/${track.slug}/${topic.slug}`}
        >
          <UpIcon /> {topic.title}
        </PaginationLinkFull>
      )}

      {next?.slug ? (
        <PaginationLinkFull
          label="Next"
          textAlign="right"
          href={`/learn/${track.slug}/${topic.slug}/${next.slug}`}
        >
          {next.title} <NextIcon />
        </PaginationLinkFull>
      ) : (
        <PaginationLinkFull
          label="Up"
          textAlign="right"
          href={`/learn/${track.slug}/${topic.slug}`}
        >
          {topic.title} <UpIcon />
        </PaginationLinkFull>
      )}
    </SimpleGrid>
  )
}

function PaginationLinkFull({ label, href, textAlign, children }) {
  return (
    <NextLink href={href} passHref>
      <Link
        label={label}
        textAlign={textAlign}
        rounded="md"
        px={2}
        py={5}
        _hover={{
          textDecor: 'none',
          bg: useColorModeValue('gray.100', 'gray.800'),
        }}
      >
        <Text fontSize="sm">{label}</Text>
        <Text fontSize="md" fontWeight="bold" color="teal.400">
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}
