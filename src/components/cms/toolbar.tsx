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
import { useForm } from 'react-hook-form'

import { Icon } from '@components'

export function CMSToolbar({ labels, actions }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    actions.handleSearchItems(data.query)
  }

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
        <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
          <VisuallyHidden>
            <FormLabel>{labels.search}</FormLabel>
          </VisuallyHidden>
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none">
              <Icon name="search" />
            </InputLeftElement>
            <Input
              name="query"
              ref={register}
              type="text"
              placeholder={`${labels.search}...`}
            />
          </InputGroup>
        </Box>
      )}
    </Stack>
  )
}
