import { Flex } from '@chakra-ui/react'
import {
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'

import { LinkButton } from '@/components'

export default function PaginationTopics({
  prevSlug = 'previous-topic',
  nextSlug = 'next-topic',
}) {
  const previousTopicHref = `/learn/trackSlug/topics/${prevSlug}`
  const nextTopicHref = `/learn/trackSlug/topics/${nextSlug}`

  return (
    <Flex as="nav" justify="space-between" my={5}>
      <LinkButton
        href={previousTopicHref}
        variant="ghost"
        leftIcon={<PreviousIcon />}
      >
        Previous Topic
      </LinkButton>

      <LinkButton href={nextTopicHref} variant="ghost" rightIcon={<NextIcon />}>
        Next Topic
      </LinkButton>
    </Flex>
  )
}
