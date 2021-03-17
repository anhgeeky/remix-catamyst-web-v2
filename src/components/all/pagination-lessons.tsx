import NextLink from 'next/link'
import {
  HStack,
  IconButton,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import {
  ArrowUpIcon as UpIcon,
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'
import dataTheme from '@theme/theme.json'
import React from 'react'

export function PaginationLessons({
  mode,
  track,
  topic,
  prev,
  next,
  children = undefined,
}) {
  const [isMobile] = useMediaQuery('(max-width: 425px)')

  /**
   * Only render top/minimal lessons pagination
   * above mobile size to avoid shifted hero layout
   */
  if (mode === 'minimal' && isMobile) {
    return <>{children}</>
  }
  if (mode === 'minimal' && !isMobile) {
    return (
      <PaginationLessonsMinimal
        track={track}
        topic={topic}
        prev={prev}
        next={next}
      >
        <>{children}</>
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
      maxW={dataTheme.maxContentWidth}
    >
      {prev?.slug ? (
        <PaginationLinkMinimal
          label="Previous Lesson"
          href={`/learn/${track.slug}/${topic.slug}/${prev.slug}`}
          icon={<PreviousIcon />}
        />
      ) : (
        <PaginationLinkMinimal
          label="Up to Topic"
          href={`/learn/${track.slug}/${topic.slug}`}
          icon={<UpIcon />}
        />
      )}

      {children}

      {next?.slug ? (
        <PaginationLinkMinimal
          label="Next Lesson"
          href={`/learn/${track.slug}/${topic.slug}/${next.slug}`}
          icon={<NextIcon />}
        />
      ) : (
        <PaginationLinkMinimal
          label="Up to Topic"
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
      px={5}
      spacing={2}
      columns={2}
      maxW={dataTheme.maxContentWidth}
    >
      {prev?.slug ? (
        <PaginationLinkFull
          label="Previous Lesson"
          textAlign="left"
          href={`/learn/${track.slug}/${topic.slug}/${prev.slug}`}
        >
          <PreviousIcon /> {prev.title}
        </PaginationLinkFull>
      ) : (
        <PaginationLinkFull
          label="Up to Topic"
          textAlign="left"
          href={`/learn/${track.slug}/${topic.slug}`}
        >
          <UpIcon /> {topic.iconEmoji} {topic.title}
        </PaginationLinkFull>
      )}

      {next?.slug ? (
        <PaginationLinkFull
          label="Next Lesson"
          textAlign="right"
          href={`/learn/${track.slug}/${topic.slug}/${next.slug}`}
        >
          {next.title} <NextIcon />
        </PaginationLinkFull>
      ) : (
        <PaginationLinkFull
          label="Up to Topic"
          textAlign="right"
          href={`/learn/${track.slug}/${topic.slug}`}
        >
          {topic.iconEmoji} {topic.title} <UpIcon />
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
        p={3}
        _hover={{
          textDecoration: 'none',
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
