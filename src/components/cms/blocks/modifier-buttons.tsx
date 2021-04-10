import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Switch,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Card, Icon } from '@components'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 * CMS Modifier Buttons for naming, moving, and deleting block
 */
export function CMSBlockModifierButtons({
  index,
  name,
  block,
  actions,
  children = null,
}) {
  return (
    <HStack
      justify="space-between"
      // opacity={0.1}
      // _hover={{ opacity: 1 }}
      // _focus={{ opacity: 1 }}
    >
      <HStack>
        <Tag colorScheme="teal">{name}</Tag>
        {/* <Switch
          size="sm"
          name={`blocks[${block.index}].is_published`}
          defaultChecked={block.is_published}
          onChange={actions.togglePublishBlock}
        />
        <Text fontSize="xs">
          {block.is_published ? 'Published' : 'Unpublished'}
        </Text> */}
        {children}
      </HStack>

      <ButtonGroup size="xs">
        <IconButton
          aria-label="Move block up"
          icon={<Icon name="up" />}
          onClick={() => actions.moveBlock(index, 'up')}
        />
        <IconButton
          aria-label="Move block down"
          icon={<Icon name="down" />}
          onClick={() => actions.moveBlock(index, 'down')}
        />
        <Button
          colorScheme="blue"
          leftIcon={<Icon name="save" />}
          onClick={() => actions.saveBlock(index)}
        >
          Save
        </Button>
        <IconButton
          aria-label="Delete block"
          colorScheme="red"
          icon={<Icon name="delete" />}
          onClick={() => actions.removeBlock(index)}
        />
      </ButtonGroup>
    </HStack>
  )
}
