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
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'
import theme from '@/theme/theme.json'
import React from 'react'

export default function PaginationLessons({
  mode = 'full',
  prev = {
    slug: 'other-lesson',
    title: 'Other lesson title',
  },
  next = {
    slug: 'another-lesson',
    title: 'Another lesson title',
  },
  children = undefined,
}) {
  if (mode === 'minimal') {
    return (
      <PaginationLessonsMinimal prev={prev} next={next}>
        {children}
      </PaginationLessonsMinimal>
    )
  }
  if (mode === 'full') {
    return <PaginationLessonsFull prev={prev} next={next} />
  }
  return null
}

function PaginationLessonsMinimal({ prev, next, children }) {
  const previousLessonHref = `/learn/track/topic/${prev.slug}`
  const nextLessonHref = `/learn/track/topic/${next.slug}`

  return (
    <HStack
      as="nav"
      aria-label="Pagination lesson"
      width="100%"
      justify="space-between"
      maxW={theme.maxContentWidth}
    >
      <PaginationLinkMinimal label="Previous" href={previousLessonHref} />
      {children}
      <PaginationLinkMinimal label="Next" href={nextLessonHref} />
    </HStack>
  )
}

function PaginationLinkMinimal({ label, href }) {
  return (
    <NextLink href={href} passHref>
      <IconButton
        aria-label={label}
        label={label}
        rounded="md"
        variant="ghost"
        rel={label === 'Next' ? 'Next' : 'Previous'}
        textAlign={label === 'Next' ? 'right' : 'left'}
        icon={label === 'Next' ? <NextIcon /> : <PreviousIcon />}
      />
    </NextLink>
  )
}

function PaginationLessonsFull({ prev, next }) {
  const previousLessonHref = `/learn/track/topic/${prev.slug}`
  const nextLessonHref = `/learn/track/topic/${next.slug}`

  return (
    <SimpleGrid
      as="nav"
      aria-label="Pagination lesson"
      px={5}
      width="100%"
      columns={2}
      maxW={theme.maxContentWidth}
    >
      <PaginationLinkFull label="Previous" href={previousLessonHref}>
        <PreviousIcon /> {prev.title}
      </PaginationLinkFull>
      <PaginationLinkFull label="Next" href={nextLessonHref}>
        {next.title} <NextIcon />
      </PaginationLinkFull>
    </SimpleGrid>
  )
}

function PaginationLinkFull({ label, href, children }) {
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <NextLink href={href} passHref>
      <Link
        label={label}
        p={2}
        rel={label === 'Next' ? 'next' : 'previous'}
        rounded="md"
        textAlign={label === 'Next' ? 'right' : 'left'}
        _hover={{
          textDecor: 'none',
          bg,
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
