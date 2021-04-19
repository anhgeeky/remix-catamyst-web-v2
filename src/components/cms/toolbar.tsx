import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  ButtonGroup,
  InputLeftElement,
  VisuallyHidden,
} from '@chakra-ui/react'

import { Icon } from '@components'

export function CMSToolbar({ labels, actions }) {
  return (
    <Stack direction="row" mb={5}>
      {labels.create && (
        <ButtonGroup size="sm" colorScheme="teal">
          <Button
            leftIcon={<Icon name="add" />}
            onClick={actions.handleCreateItem}
          >
            {labels.create}
          </Button>
        </ButtonGroup>
      )}

      {labels.search && (
        <Box width="100%">
          <VisuallyHidden>
            <FormLabel>{labels.search}</FormLabel>
          </VisuallyHidden>
          <InputGroup size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon name="search" />}
            />
            <Input
              type="text"
              placeholder={`${labels.search}...`}
              onChange={actions.handleSearchItems}
            />
          </InputGroup>
        </Box>
      )}
    </Stack>
  )
}
