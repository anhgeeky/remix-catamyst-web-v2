import { Image, Heading, HStack } from '@chakra-ui/react'

export function TopicIconTitleSpan({ topic }) {
  return (
    <HStack>
      {topic.icon_url && <Image src={topic.icon_url} height={15} width={15} />}
      {!topic.icon_url && <span>{topic.icon_emoji || '🐈'}</span>}
      <span>{topic.title}</span>
    </HStack>
  )
}

export function TopicIconTitleHeadingOne({ topic }) {
  return (
    <HStack>
      {topic.icon_url && <Image src={topic.icon_url} height={50} width={50} />}
      {!topic.icon_url && <span>{topic.icon_emoji || '🐈'}</span>}
      <Heading as="h1" size="xl" pt={2}>
        {topic.title}
      </Heading>
    </HStack>
  )
}

export function TopicIconTitleHeadingThree({ topic }) {
  return (
    <HStack>
      {topic.icon_url && <Image src={topic.icon_url} height={25} width={25} />}
      {!topic.icon_url && <span>{topic.icon_emoji || '🐈'}</span>}
      <Heading as="h3" size="md" pt={1}>
        {topic.title}
      </Heading>
    </HStack>
  )
}
