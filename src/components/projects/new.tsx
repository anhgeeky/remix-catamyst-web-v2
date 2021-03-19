import { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  VStack,
  Input,
  ButtonGroup,
  Button,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'
import { CUIAutoComplete as SelectAutoComplete } from 'chakra-ui-autocomplete'

import { LinkButton, Icon, useToast } from '@components'
import dataProjectCategories from '@data/project-categories.json'
import dataProjectSpecifics from '@data/project-specifics.json'

export function ProjectNew() {
  const toast = useToast()

  const handlePublish = () => {
    toast({ status: 'success', title: 'Published a project!' })
  }
  const handleSaveDraft = () => {
    toast({ status: 'info', title: 'Saved project as draft!' })
  }

  return (
    <Flex justify="center">
      <Stack maxW={760} width="100%" spacing={5}>
        <ButtonGroup size="sm">
          <Button
            colorScheme="teal"
            onClick={handlePublish}
            leftIcon={<Icon name="publish" />}
          >
            Publish project
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSaveDraft}
            leftIcon={<Icon name="save" />}
          >
            Save as draft
          </Button>
          <LinkButton href="/dashboard/projects">Cancel</LinkButton>
        </ButtonGroup>

        <Box>
          <FormControl>
            <VisuallyHidden>
              <FormLabel>Title or name</FormLabel>
            </VisuallyHidden>
            <Input
              // ref={register}
              isRequired
              name="title"
              fontFamily="heading"
              fontWeight="700"
              fontSize="4xl"
              variant="unstyled"
              py={3}
              placeholder="Project title or name"
              aria-placeholder="Enter project title or name"
            />
          </FormControl>

          <FormControl>
            <VisuallyHidden>
              <FormLabel>Subtitle or tagline</FormLabel>
            </VisuallyHidden>
            <Input
              // ref={register}
              name="subtitle"
              fontSize="2xl"
              variant="unstyled"
              py={3}
              placeholder="Subtitle, tagline, or short description..."
              aria-placeholder="Enter subtitle, tagline, or short description"
            />
          </FormControl>

          <FormControl>
            <VisuallyHidden>
              <FormLabel>URL or link</FormLabel>
            </VisuallyHidden>
            <Input
              isRequired
              // ref={register}
              name="url"
              fontSize="xl"
              variant="unstyled"
              py={3}
              placeholder="https://example.com"
              aria-placeholder="Enter URL like https://example.com"
            />
          </FormControl>
        </Box>

        <Box>
          <Flex
            align="center"
            bg={useColorModeValue('white', 'gray.800')}
            borderColor={useColorModeValue('gray.100', 'gray.700')}
            borderWidth={2}
            height={300}
            justify="center"
            rounded="md"
            width="100%"
          >
            <Button variant="outline">Upload images</Button>
          </Flex>
        </Box>

        <Box className="select-project-categories hide-last-div">
          <SelectProjectCategories />
        </Box>
        <Box className="select-project-specifics hide-last-div">
          <SelectProjectSpecifics />
        </Box>
      </Stack>
    </Flex>
  )
}

export interface Item {
  label: string
  value: string
}

const categories = dataProjectCategories.map((category) => {
  return {
    label: category,
    value: category,
  }
})

const specifics = dataProjectSpecifics.map((specific) => {
  return {
    label: specific,
    value: specific,
  }
})

export function SelectProjectCategories() {
  const [pickerItems, setPickerItems] = useState(categories)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const handleCreateItem = (Item: Item) => {
    setPickerItems((curr) => [...curr, Item])
    setSelectedItems((curr) => [...curr, Item])
  }

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  return (
    <SelectAutoComplete
      label="Categories"
      placeholder="Choose one or more categories"
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  )
}

export function SelectProjectSpecifics() {
  const [pickerItems, setPickerItems] = useState(specifics)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const handleCreateItem = (Item: Item) => {
    setPickerItems((curr) => [...curr, Item])
    setSelectedItems((curr) => [...curr, Item])
  }

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  return (
    <SelectAutoComplete
      label="Tools and technologies"
      placeholder="Choose one or more tools and technologies"
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) =>
        handleSelectedItemsChange(changes.selectedItems)
      }
    />
  )
}
