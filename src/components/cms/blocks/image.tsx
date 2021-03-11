import { useState } from 'react'
import {
  Badge,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Stack,
  Switch,
  Textarea,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'

import { Icon } from '@components'
import { BlockImage } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

/**
 * Block only can be used for CMS
 * But combines block for CMS and actual content as preview
 */
export function CMSBlockImage({ block }) {
  /**
   * Need to use RHF
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
          bg={useColorModeValue('white', 'gray.800')}
          align="stretch"
          boxShadow="base"
          flexWrap="wrap"
          maxW="800px"
          rounded="sm"
          width="100%"
        >
          <Stack spacing={1} p={2} width="100%">
            <CMSBlockModifierButtons name="Image" />

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
                placeholder="https://example.com"
                onChange={handleChange}
                value={formBlock.url}
              />
            </FormControl>

            <HStack spacing={3}>
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
                  defaultValue={formBlock.title}
                  placeholder="Image Title"
                />
              </FormControl>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Alt Text:</FormLabel>
                </VisuallyHidden>
                <Icon name="alt" />
                <Input
                  name="alt"
                  size="sm"
                  type="text"
                  variant="unstyled"
                  defaultValue={formBlock.alt}
                  placeholder="Alt Text"
                />
              </FormControl>
            </HStack>

            <HStack spacing={3}>
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
                  defaultValue={formBlock.author}
                  placeholder="Author Name"
                />
              </FormControl>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Copyright:</FormLabel>
                </VisuallyHidden>
                <Icon name="copyright" />
                <Input
                  name="copyright"
                  size="sm"
                  type="text"
                  variant="unstyled"
                  defaultValue={formBlock.copyright}
                  placeholder="Copyright"
                />
              </FormControl>

              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>Size:</FormLabel>
                </VisuallyHidden>
                <Icon name="size" />
                <Select
                  name="size"
                  size="sm"
                  variant="unstyled"
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
                  <FormLabel>Meta</FormLabel>
                </VisuallyHidden>
                <Icon name="meta" />
                <Switch name="showMeta" defaultValue={block.showMeta} />
              </FormControl>
            </HStack>

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
                defaultValue={formBlock.source}
                placeholder="Source name or URL"
              />
            </FormControl>
          </Stack>
        </Flex>
      </>
    )
  }
  return null
}
