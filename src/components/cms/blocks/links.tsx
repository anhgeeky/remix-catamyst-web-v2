import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Heading,
  Textarea,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'

import { Icon, ReferenceIcon } from '@components'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

/**
 * Block only can be used for CMS
 */
export function CMSBlockLinks({ block }) {
  return (
    <Stack maxW="800px" width="100%" py={3}>
      {block.category === 'References' && (
        <Heading
          as="h1"
          color="gray.500"
          fontFamily="body"
          fontSize="xl"
          textAlign="center"
          textTransform="uppercase"
          letterSpacing={0.5}
        >
          References
        </Heading>
      )}
      {block.links.map((link, index) => {
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
              width="5px"
              borderTopLeftRadius="md"
              borderBottomLeftRadius="md"
            />

            <Stack spacing={1} p={2} width="99%">
              <CMSBlockModifierButtons name="Link" />

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>URL:</FormLabel>
                </VisuallyHidden>
                <Icon name="link" />
                <Textarea
                  name="url"
                  size="sm"
                  type="text"
                  variant="unstyled"
                  resize="none"
                  defaultValue={link.url}
                  placeholder="https://example.com"
                />
              </FormControl>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Title:</FormLabel>
                </VisuallyHidden>
                <Icon name="title" />
                <Input
                  name="title"
                  size="sm"
                  type="text"
                  variant="unstyled"
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
                  <ReferenceIcon name={link.category} />
                  <Select
                    name="category"
                    size="sm"
                    variant="unstyled"
                    placeholder="Select category"
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
                  <Icon name="url" />
                  <Input
                    name="source"
                    size="sm"
                    type="text"
                    variant="unstyled"
                    defaultValue={link.source}
                    placeholder="Source Name"
                  />
                </FormControl>

                <FormControl as={HStack}>
                  <VisuallyHidden>
                    <FormLabel>Author:</FormLabel>
                  </VisuallyHidden>
                  <Icon name="author" />
                  <Input
                    name="author"
                    size="sm"
                    type="text"
                    variant="unstyled"
                    defaultValue={link.author}
                    placeholder="Author Name"
                  />
                </FormControl>

                <FormControl as={HStack}>
                  <VisuallyHidden>
                    <FormLabel>Color:</FormLabel>
                  </VisuallyHidden>
                  <Icon name="color" />
                  <Input
                    name="title"
                    size="sm"
                    type="text"
                    variant="unstyled"
                    defaultValue={link.color}
                    placeholder="color.500"
                  />
                </FormControl>
              </HStack>
            </Stack>
          </Flex>
        )
      })}
    </Stack>
  )
}
