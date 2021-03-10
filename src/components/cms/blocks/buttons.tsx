import prettyjson from 'prettyjson'
import { Text } from '@chakra-ui/react'
import { Card } from '@components'

/**
 * CMS Block Buttons to add more block into CMS lesson editor
 */
export function CMSBlockButtons({ block }) {
  return (
    <Card>
      <Text as="pre" fontSize="xs" width="760px" overflow="scroll">
        {prettyjson.render(block)}
      </Text>
    </Card>
  )
}
