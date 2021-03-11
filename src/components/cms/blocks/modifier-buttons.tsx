import {
  Flex,
  Tooltip,
  ButtonGroup,
  IconButton,
  useToast,
  HStack,
  Badge,
} from '@chakra-ui/react'
import { Card, Icon } from '@components'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 * CMS Modifier Buttons for naming, moving, and deleting block
 */
export function CMSBlockModifierButtons({ name }) {
  const toast = useToast({ duration: 1000, position: 'bottom' })

  return (
    <HStack justify="space-between">
      <Badge colorScheme="teal">{name}</Badge>
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
