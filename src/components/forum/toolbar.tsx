import {
  Flex,
  Stack,
  Avatar,
  Box,
  SimpleGrid,
  Link,
  Heading,
  Text,
} from '@chakra-ui/react'

import { Card } from '@components'
import { dataForumSections } from '@data'

export function ForumToolbar() {
  return (
    <Flex>
      <Text>
        <b>
          {dataForumSections.filter((section) => section.isPublished).length}
        </b>
        <span> forum sections in total</span>
      </Text>
    </Flex>
  )
}
