import {
  ButtonGroup,
  IconButton,
  HStack,
  Badge,
  Switch,
  Text,
} from '@chakra-ui/react'
import { Card, Icon } from '@components'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 * CMS Modifier Buttons for naming, moving, and deleting block
 */
export function CMSBlockModifierButtons({ block, name, children = null }) {
  return (
    <HStack justify="space-between">
      <HStack>
        <Badge colorScheme="teal">{name}</Badge>
        <Switch size="sm" name="isPublished" value={block.isPublished} />
        <Text>{block.isPublished && 'PUBLISHED'}</Text>
        {children}
      </HStack>

      <ButtonGroup size="xs">
        <IconButton aria-label="Move up" icon={<Icon name="up" />} />
        <IconButton aria-label="Move down" icon={<Icon name="down" />} />
        <IconButton
          aria-label="Delete link block"
          colorScheme="red"
          icon={<Icon name="delete" />}
        />
      </ButtonGroup>
    </HStack>
  )
}
