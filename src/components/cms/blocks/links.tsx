import {
  Box,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  InputGroup,
  Input,
  Textarea,
  Flex,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'

import { Card, ReferenceIcon } from '@components'
import dataTheme from '@theme/theme.json'

export function CMSBlockLinks({ links }) {
  return (
    <Stack maxW="800px" width="100%" py={3}>
      {links.map((link, index) => {
        return (
          <Flex
            key={index}
            align="stretch"
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="base"
            flexWrap="wrap"
            p={0}
            rounded="md"
          >
            <Box
              bg={link.color || useColorModeValue('gray.100', 'gray.700')}
              width="10px"
              borderTopLeftRadius="md"
              borderBottomLeftRadius="md"
            />

            <Stack spacing={1} p={2} width="98%">
              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Title:</FormLabel>
                </VisuallyHidden>
                <Input
                  name="title"
                  size="md"
                  type="text"
                  variant="flushed"
                  fontWeight="700"
                  defaultValue={link.title}
                  placeholder="Link Title"
                />
              </FormControl>

              <HStack spacing={3}>
                <FormControl as={HStack}>
                  <VisuallyHidden>
                    <FormLabel>Category:</FormLabel>
                  </VisuallyHidden>
                  <ReferenceIcon category={link.category} />
                  <Select
                    name="category"
                    size="md"
                    variant="flushed"
                    placeholder="Select option"
                    defaultValue={link.category}
                  >
                    <option value="App">App</option>
                    <option value="Article">Article</option>
                    <option value="News">News</option>
                    <option value="Plugin">Plugin</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Video">Video</option>
                    <option value="Website">Website</option>
                  </Select>
                </FormControl>

                <FormControl as={HStack}>
                  <VisuallyHidden>
                    <FormLabel>Source:</FormLabel>
                  </VisuallyHidden>
                  <Input
                    name="source"
                    size="md"
                    type="text"
                    variant="flushed"
                    defaultValue={link.source}
                    placeholder="Source Name"
                  />
                </FormControl>

                <FormControl as={HStack}>
                  <VisuallyHidden>
                    <FormLabel>Author:</FormLabel>
                  </VisuallyHidden>
                  <Input
                    name="author"
                    size="md"
                    type="text"
                    variant="flushed"
                    defaultValue={link.author}
                    placeholder="Author Name"
                  />
                </FormControl>

                <FormControl as={HStack}>
                  <VisuallyHidden>
                    <FormLabel>Color:</FormLabel>
                  </VisuallyHidden>
                  <Input
                    name="title"
                    size="md"
                    type="text"
                    variant="flushed"
                    defaultValue={link.color}
                    placeholder="color.500"
                  />
                </FormControl>
              </HStack>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>URL:</FormLabel>
                </VisuallyHidden>
                <Textarea
                  name="url"
                  size="md"
                  type="text"
                  variant="flushed"
                  resize="none"
                  defaultValue={link.url}
                  placeholder="https://website.com"
                />
              </FormControl>
            </Stack>
          </Flex>
        )
      })}
    </Stack>
  )
}
