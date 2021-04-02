import { useForm, useFieldArray } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ButtonGroup,
  IconButton,
  HStack,
  Select,
  Stack,
} from '@chakra-ui/react'

import { Card, Icon } from '@components'

export function UserSocialsForm({ state }) {
  const { profile } = state
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
  } = useForm({ defaultValues: profile })

  const { fields, append, remove } = useFieldArray({ control, name: 'socials' })

  return (
    <Card as={Stack}>
      <Heading as="h3" size="md">
        Social Links
      </Heading>
      <Stack>
        {fields.map((item, index) => (
          <HStack key={item.id}>
            <Select
              placeholder="Select social"
              name={`fields[${index}].name`}
              ref={register()}
              defaultValue={item.name}
              maxW="150px"
            >
              <option value="Twitter">Twitter</option>
              <option value="GitHub">GitHub</option>
              <option value="YouTube">YouTube</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
            </Select>
            <Input
              name={`fields[${index}].url`}
              ref={register()}
              placeholder="https://example.com/yourname"
              defaultValue={item.url}
            />
            <IconButton
              aria-label="Delete social link"
              colorScheme="red"
              icon={<Icon name="delete" />}
              onClick={() => remove(index)}
            />
          </HStack>
        ))}
        <ButtonGroup>
          <Button
            leftIcon={<Icon name="add" />}
            onClick={append}
            colorScheme="teal"
          >
            Add
          </Button>
          <Button leftIcon={<Icon name="save" />} colorScheme="blue">
            Save social links
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  )
}
