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
export function CMSBlockModifierButtons({
  name,
  block,
  actions,
  children = null,
}) {
  return (
    <HStack justify="space-between">
      <HStack>
        <Badge colorScheme="teal">{name}</Badge>
        <Switch
          size="sm"
          name={`blocks[${block.index}].isPublished`}
          // ref={actions.register}
          defaultChecked={block.isPublished}
        />
        <Text fontSize="xs">{block.isPublished ? 'Publish' : 'Unpublish'}</Text>
        {children}
      </HStack>

      <ButtonGroup size="xs">
        <IconButton
          aria-label="Move up"
          icon={<Icon name="up" />}
          onClick={() => actions.moveBlock('up')}
        />
        <IconButton
          aria-label="Move down"
          icon={<Icon name="down" />}
          onClick={() => actions.moveBlock('down')}
        />
        <IconButton
          aria-label="Delete link block"
          colorScheme="red"
          icon={<Icon name="delete" />}
          onClick={() => actions.removeBlock()}
        />
      </ButtonGroup>
    </HStack>
  )
}
