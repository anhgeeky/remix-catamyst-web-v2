import { useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Switch,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'

import { Icon, CardArea } from '@components'
import { BlockImage } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

/**
 * Block only can be used for CMS.
 * But combines block for CMS and actual content as preview.
 * Because regular BlockImage uses NextImage by default,
 * it needs to specify the renderer with regular Image so it won't break
 * when changing the image URL.
 */
export function CMSBlockImage({ index, block, actions }) {
  /**
   * Need to use RHF later.
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
      <CardArea>
        <CMSBlockModifierButtons
          name="Image"
          index={index}
          block={formBlock}
          actions={actions}
        />

        <BlockImage block={formBlock} renderer="Image" />

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
            <HStack>
              <FormControl as={HStack}>
                <VisuallyHidden>
                  <FormLabel>URL:</FormLabel>
                </VisuallyHidden>
                <Icon name="link" />
                <Input
                  name="link"
                  size="sm"
                  type="text"
                  variant="flushed"
                  resize="none"
                  placeholder="https://example.com"
                  onChange={handleChange}
                  value={formBlock.url}
                />
              </FormControl>
            </HStack>

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
                  variant="flushed"
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
                  variant="flushed"
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
                  variant="flushed"
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
                  variant="flushed"
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
                  variant="flushed"
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
              <Icon name="link" />
              <Input
                name="source"
                size="sm"
                type="text"
                variant="flushed"
                defaultValue={formBlock.source}
                placeholder="Source name or URL"
              />
            </FormControl>
          </Stack>
        </Flex>
      </CardArea>
    )
  }
}
