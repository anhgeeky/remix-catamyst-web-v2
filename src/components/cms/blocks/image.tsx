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
export function CMSBlockImage(props) {
  const {
    index,
    block,
    actions: { register },
  } = props

  if (!block) {
    return <p>Loading image...</p>
  }
  return (
    <CardArea>
      <CMSBlockModifierButtons {...props} />

      <BlockImage block={block} renderer="Image" />

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
              <Icon name="url" />
              <Input
                key={block.id}
                ref={register()}
                name={`blocks[${index}].url`}
                defaultValue={block.url}
                placeholder="https://example.com"
                size="sm"
                type="text"
                variant="flushed"
                resize="none"
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
                key={block.id}
                ref={register()}
                name={`blocks[${index}].title`}
                defaultValue={block.title}
                placeholder="Image Title"
                size="sm"
                type="text"
                variant="flushed"
                fontWeight="700"
              />
            </FormControl>

            <FormControl as={HStack}>
              <VisuallyHidden>
                <FormLabel>Alt Text:</FormLabel>
              </VisuallyHidden>
              <Icon name="alt" />
              <Input
                key={block.id}
                ref={register()}
                name={`blocks[${index}].alt`}
                defaultValue={block.alt}
                placeholder="Alt Text"
                size="sm"
                type="text"
                variant="flushed"
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
                key={block.id}
                ref={register()}
                name={`blocks[${index}].author`}
                defaultValue={block.author}
                placeholder="Author Name"
                size="sm"
                type="text"
                variant="flushed"
              />
            </FormControl>

            <FormControl as={HStack}>
              <VisuallyHidden>
                <FormLabel>Copyright:</FormLabel>
              </VisuallyHidden>
              <Icon name="copyright" />
              <Input
                key={block.id}
                ref={register()}
                name={`blocks[${index}].copyright`}
                defaultValue={block.copyright}
                placeholder="Copyright"
                size="sm"
                type="text"
                variant="flushed"
              />
            </FormControl>

            <FormControl as={HStack}>
              <VisuallyHidden>
                <FormLabel>Size:</FormLabel>
              </VisuallyHidden>
              <Icon name="size" />
              <Select
                key={block.id}
                ref={register()}
                name={`blocks[${index}].size`}
                defaultValue={block.size || 'Small'}
                size="sm"
                variant="flushed"
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
              <Icon name="meta" />
              <FormLabel fontSize="sm">Meta</FormLabel>
              <Switch
                size="sm"
                key={block.id}
                ref={register()}
                name={`blocks[${index}].show_meta`}
                defaultChecked={block.show_meta || false}
              />
            </FormControl>

            <FormControl as={HStack}>
              <Icon name="invert" />
              <FormLabel fontSize="sm">Invertable</FormLabel>
              <Switch
                size="sm"
                key={block.id}
                ref={register()}
                name={`blocks[${index}].is_invertable`}
                defaultChecked={block.is_invertable || true}
              />
            </FormControl>
          </HStack>

          <FormControl as={HStack}>
            <VisuallyHidden>
              <FormLabel>Source:</FormLabel>
            </VisuallyHidden>
            <Icon name="source" />
            <Input
              name={`blocks[${index}].source`}
              ref={register()}
              size="sm"
              type="text"
              variant="flushed"
              defaultValue={block.source}
              placeholder="Source name or URL"
            />
          </FormControl>
        </Stack>
      </Flex>
    </CardArea>
  )
}
