import { useState } from 'react'
import {
  Box,
  Button,
  Badge,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Link,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  ChevronDownIcon as DownIcon,
  ChevronUpIcon as UpIcon,
  DeleteIcon,
} from '@chakra-ui/icons'

import { BlockImage } from '@components/blocks'

/**
 * Block only can be used for CMS
 * But combines block for CMS and actual content as preview
 */
export function CMSBlockImage({ block }) {
  /**
   * Need to use Formik
   */
  const [formBlock, setFormBlock] = useState(block)

  const handleChange = (event) => {
    setFormBlock({ ...formBlock, [event.target.name]: event.target.value })
  }

  if (!formBlock) {
    return <p>Loading image...</p>
  }
  if (formBlock) {
    return (
      <>
        <BlockImage block={formBlock} />

        <Flex
          width="100%"
          maxW="800px"
          align="stretch"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="base"
          flexWrap="wrap"
          p={0}
          rounded="md"
        >
          <Stack spacing={1} p={2} width="100%">
            <HStack p={2} justify="space-between">
              <Badge colorScheme="teal">Image</Badge>
              <ButtonGroup size="xs">
                <IconButton aria-label="Move up" icon={<UpIcon />} />
                <IconButton aria-label="Move down" icon={<DownIcon />} />
                <IconButton
                  aria-label="Delete image block"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                />
              </ButtonGroup>
            </HStack>

            <FormControl as={HStack}>
              <VisuallyHidden>
                <FormLabel>URL:</FormLabel>
              </VisuallyHidden>
              <Textarea
                name="url"
                size="md"
                type="text"
                variant="unstyled"
                resize="none"
                placeholder="https://website.com"
                onChange={handleChange}
                value={formBlock.url}
              />
            </FormControl>

            <HStack spacing={3}>
              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Size:</FormLabel>
                </VisuallyHidden>
                <Select
                  name="size"
                  size="md"
                  variant="unstyled"
                  maxW={200}
                  defaultValue={formBlock.size || 'Small'}
                  placeholder="Select size"
                >
                  <option value="Tiny">Tiny</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Huge">Huge</option>
                </Select>
              </FormControl>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Author:</FormLabel>
                </VisuallyHidden>
                <Input
                  name="author"
                  size="md"
                  type="text"
                  variant="unstyled"
                  defaultValue={formBlock.author}
                  placeholder="Author Name"
                />

                <FormControl as={HStack}>
                  <FormLabel htmlFor="block-image-meta" mb="0">
                    Show Meta?
                  </FormLabel>
                  <Switch
                    name="block-image-meta"
                    defaultValue={block.showMeta}
                  />
                </FormControl>
              </FormControl>
            </HStack>

            <HStack spacing={3}>
              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Title:</FormLabel>
                </VisuallyHidden>
                <Input
                  name="title"
                  size="md"
                  type="text"
                  variant="unstyled"
                  fontWeight="700"
                  defaultValue={formBlock.title}
                  placeholder="Image Title"
                />
              </FormControl>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Alt Text:</FormLabel>
                </VisuallyHidden>
                <Input
                  name="alt"
                  size="md"
                  type="text"
                  variant="unstyled"
                  defaultValue={formBlock.alt}
                  placeholder="Alt Text"
                />
              </FormControl>
            </HStack>

            <FormControl as={HStack}>
              <VisuallyHidden>
                <FormLabel>Source URL:</FormLabel>
              </VisuallyHidden>
              <Input
                name="sourceUrl"
                size="md"
                type="text"
                variant="unstyled"
                defaultValue={formBlock.sourceUrl}
                placeholder="Source URL"
              />
            </FormControl>
          </Stack>
        </Flex>
      </>
    )
  }
  return null
}
