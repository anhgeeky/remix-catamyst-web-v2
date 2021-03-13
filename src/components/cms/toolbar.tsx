import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  VisuallyHidden,
} from '@chakra-ui/react'

import { Icon } from '@components'

export function CMSToolbar({ labels, actions }) {
  return (
    <Stack direction="row">
      <Box>
        <Button
          colorScheme="teal"
          leftIcon={<Icon name="add" />}
          onClick={actions.handleCreateItem}
        >
          {labels.create}
        </Button>
      </Box>
      <Box width="100%">
        <VisuallyHidden>
          <FormLabel>{labels.search}</FormLabel>
        </VisuallyHidden>
        <InputGroup>
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
    </Stack>
  )
}
