import {
  HStack,
  ButtonGroup,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Tooltip,
} from '@chakra-ui/react'

import { Icon } from '@components'

export function ForumToolbar({ state, actions }) {
  return (
    <HStack>
      <ButtonGroup colorScheme="teal">
        <Tooltip hasArrow placement="top" label="Grid layout">
          <IconButton
            aria-label="Grid layout"
            icon={<Icon name="grid" />}
            onClick={() => actions.handleToggleLayout('grid')}
            variant={state.layout === 'grid' ? 'solid' : 'outline'}
          />
        </Tooltip>
        <Tooltip hasArrow placement="top" label="Row layout">
          <IconButton
            aria-label="Row layout"
            icon={<Icon name="row" />}
            onClick={() => actions.handleToggleLayout('row')}
            variant={state.layout === 'row' ? 'solid' : 'outline'}
          />
        </Tooltip>
      </ButtonGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon name="search" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder={`Search from ${state.sections?.length} forum sections...`}
        />
      </InputGroup>
    </HStack>
  )
}
