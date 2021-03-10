import prettyjson from 'prettyjson'
import { Text } from '@chakra-ui/react'
import { Card } from '@components'

export function CMSBlockTexts({ block }) {
  return (
    <Card>
      <Text as="pre" fontSize="xs" width="760px" overflow="scroll">
        {prettyjson.render(block)}
      </Text>
    </Card>
  )
}
