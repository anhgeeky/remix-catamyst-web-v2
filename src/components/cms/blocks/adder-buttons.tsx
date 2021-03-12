import { Badge, ButtonGroup, Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { Icon } from '@components'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 */
export function CMSBlockAdderButtons({ name, actions }) {
  return (
    <ButtonGroup
      as={Flex}
      justify="center"
      align="center"
      size="sm"
      py={2}
      width="100%"
      maxW={800}
      _hover={{ opacity: 1 }}
    >
      {/* CMS Block name */}
      <Badge>{name}</Badge>
      {/* CMS Block buttons to add more block */}
      <ButtonGroup
        size="sm"
        onClick={
          name === 'prepend'
            ? actions.prependBlock
            : name === 'append'
            ? actions.appendBlock
            : actions.insertBlock
        }
      >
        <Tooltip hasArrow label="Add Texts">
          <IconButton aria-label="Add texts" icon={<Icon name="texts" />} />
        </Tooltip>
        <Tooltip hasArrow label="Add Image">
          <IconButton aria-label="Add image" icon={<Icon name="image" />} />
        </Tooltip>
        <Tooltip hasArrow label="Add Links">
          <IconButton aria-label="Add links" icon={<Icon name="links" />} />
        </Tooltip>
        <Tooltip hasArrow label="Add Code">
          <IconButton aria-label="Add code" icon={<Icon name="code" />} />
        </Tooltip>
        <Tooltip hasArrow label="Add Quote">
          <IconButton aria-label="Add quote" icon={<Icon name="quote" />} />
        </Tooltip>
        <Tooltip hasArrow label="Add Divider">
          <IconButton aria-label="Add divider" icon={<Icon name="divider" />} />
        </Tooltip>
      </ButtonGroup>
    </ButtonGroup>
  )
}
