import NextLink from 'next/link'
import { Flex, Button } from '@chakra-ui/react'
import {
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'

export default function PaginationTopics({
  prevSlug = 'prev-topic',
  nextSlug = 'next-topic',
}) {
  return (
    <Flex as="nav" justify="space-between" my={5}>
      <NextLink href={`/topics/${prevSlug}`}>
        <Button variant="ghost" leftIcon={<PreviousIcon />}>
          Previous Topic
        </Button>
      </NextLink>
      <NextLink href={`/topics/${nextSlug}`}>
        <Button variant="ghost" rightIcon={<NextIcon />}>
          Next Topic
        </Button>
      </NextLink>
    </Flex>
  )
}
