import {
  HStack,
  Badge,
  ButtonGroup,
  Flex,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { Icon } from '@/components'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 */
export function CMSBlockAdderButtons({ index, name, actions }) {
  return (
    <HStack
      as={Flex}
      justify="center"
      align="center"
      py={2}
      width="100%"
      maxW={800}
    >
      {/* CMS Block name */}
      <Badge>{name}</Badge>
      {/* CMS Block buttons to add more block */}
      <ButtonGroup size="xs" variant="ghost">
        <Tooltip hasArrow label="Add Texts">
          <IconButton
            aria-label="Add texts block"
            icon={<Icon name="texts" />}
            onClick={() => actions.addBlock(index, 'Texts')}
          />
        </Tooltip>

        <Tooltip hasArrow label="Add Links">
          <IconButton
            aria-label="Add links block"
            icon={<Icon name="links" />}
            onClick={() => actions.addBlock(index, 'Links')}
          />
        </Tooltip>

        <Tooltip hasArrow label="Add Image">
          <IconButton
            aria-label="Add image block"
            icon={<Icon name="image" />}
            onClick={() => actions.addBlock(index, 'Image')}
          />
        </Tooltip>

        <Tooltip hasArrow label="Add Quote">
          <IconButton
            aria-label="Add quote block"
            icon={<Icon name="quote" />}
            onClick={() => actions.addBlock(index, 'Quote')}
          />
        </Tooltip>

        <Tooltip hasArrow label="Add Code">
          <IconButton
            aria-label="Add code block"
            icon={<Icon name="code" />}
            onClick={() => actions.addBlock(index, 'Code')}
          />
        </Tooltip>

        <Tooltip hasArrow label="Add Divider">
          <IconButton
            aria-label="Add divider block"
            icon={<Icon name="divider" />}
            onClick={() => actions.addBlock(index, 'Divider')}
          />
        </Tooltip>
      </ButtonGroup>
    </HStack>
  )
}
