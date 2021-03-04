import { Flex } from '@chakra-ui/react'
import {
  ArrowUpIcon as UpIcon,
  ArrowBackIcon as PreviousIcon,
  ArrowForwardIcon as NextIcon,
} from '@chakra-ui/icons'

import { LinkButton } from '@/components'

export default function PaginationTopics({ track, prev, next }) {
  return (
    <Flex as="nav" justify="space-between" my={5}>
      {prev?.slug ? (
        <LinkButton
          href={`/learn/${track.slug}/${prev.slug}`}
          variant="ghost"
          leftIcon={<PreviousIcon />}
        >
          {prev.iconEmoji} {prev.title}
        </LinkButton>
      ) : (
        <LinkButton
          href={`/learn/${track.slug}`}
          variant="ghost"
          leftIcon={<UpIcon />}
        >
          {track.title}
        </LinkButton>
      )}

      {next?.slug ? (
        <LinkButton
          href={`/learn/${track.slug}/${next.slug}`}
          variant="ghost"
          rightIcon={<NextIcon />}
        >
          {next.iconEmoji} {next.title}
        </LinkButton>
      ) : (
        <LinkButton
          href={`/learn/${track.slug}`}
          variant="ghost"
          rightIcon={<UpIcon />}
        >
          {track.title}
        </LinkButton>
      )}
    </Flex>
  )
}
