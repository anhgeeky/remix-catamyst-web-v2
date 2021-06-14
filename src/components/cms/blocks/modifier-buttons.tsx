import {
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  Tag,
  VisuallyHidden,
} from '@chakra-ui/react'
import { Icon } from '@/components'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 * CMS Modifier Buttons for naming, moving, and deleting block
 */
export function CMSBlockModifierButtons({
  length,
  index,
  name,
  block,
  actions,
  children = null,
}) {
  return (
    <HStack justify="space-between">
      <HStack>
        <Tag colorScheme="teal">{name}</Tag>

        <VisuallyHidden>
          <Input
            key={block.id}
            name={`blocks.${index}.type`}
            ref={actions.register()}
            defaultValue={name || 'Unknown'}
          />
        </VisuallyHidden>

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
        {index !== 0 && (
          <IconButton
            aria-label="Move block up"
            icon={<Icon name="up" />}
            onClick={() => actions.moveBlock(index, 'up')}
          />
        )}
        {length - 1 !== index && (
          <IconButton
            aria-label="Move block down"
            icon={<Icon name="down" />}
            onClick={() => actions.moveBlock(index, 'down')}
          />
        )}
        {/* <Button
          colorScheme="blue"
          leftIcon={<Icon name="save" />}
          onClick={() => actions.saveBlock(index)}
        >
          Save Block
        </Button> */}
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
