import { useEffect } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Switch,
  Stack,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { useFieldArray } from 'react-hook-form'

import { Icon, CardArea, ReferenceIcon } from '@/components'
import { CMSBlockModifierButtons } from '@/components/cms/blocks'

/**
 * Block only can be used for CMS.
 */
export function CMSBlockLinks(props) {
  /**
   * Use the actions/control from parent component.
   * https://codesandbox.io/s/react-hook-form-usefieldarray-nested-arrays-x7btr
   */
  const { index: blockIndex, block, actions } = props
  const { fields, append } = useFieldArray({
    control: actions.control,
    name: `blocks[${blockIndex}].links`,
  })

  /**
   * Auto append link item into fields if empty.
   */
  useEffect(() => {
    if (fields?.length < 1) {
      append({ category: 'App' })
    }
  })

  /**
   * Links
   * Add new link
   * block.is_published
   * block.is_references
   * block.links
   * Add new link if fields.length > 1
   */
  return (
    <CardArea>
      {block.is_references && (
        <Heading
          as="h1"
          color="gray.500"
          fontFamily="body"
          fontSize="xl"
          letterSpacing={0.5}
          textAlign="center"
          textTransform="uppercase"
        >
          References
        </Heading>
      )}

      <CMSBlockModifierButtons {...props}>
        <ButtonGroup size="xs">
          <Button
            leftIcon={<Icon name="add" />}
            onClick={() => append({ category: 'App' })}
          >
            Add new link
          </Button>
        </ButtonGroup>

        <HStack>
          <FormControl as={HStack}>
            <Switch
              key={block.id}
              ref={actions.register()}
              name={`blocks[${blockIndex}].is_published`}
              defaultChecked={block.is_published}
            />
            <FormLabel fontSize="sm">Published?</FormLabel>
          </FormControl>
          <FormControl as={HStack}>
            <Switch
              key={block.id}
              ref={actions.register()}
              name={`blocks[${blockIndex}].is_references`}
              defaultChecked={block.is_references}
            />
            <FormLabel fontSize="sm">References?</FormLabel>
          </FormControl>
        </HStack>
      </CMSBlockModifierButtons>

      {fields && (
        <Stack>
          {fields.map((item, itemIndex) => {
            return (
              <LinksItem
                key={itemIndex}
                actions={actions}
                blockIndex={blockIndex}
                item={item}
                itemIndex={itemIndex}
              />
            )
          })}
        </Stack>
      )}

      {fields.length > 1 && (
        <ButtonGroup size="xs">
          <Button
            leftIcon={<Icon name="add" />}
            onClick={() => append({ category: 'App' })}
          >
            Add new link
          </Button>
        </ButtonGroup>
      )}
    </CardArea>
  )
}

export function LinksItem({ actions, blockIndex, item, itemIndex }) {
  return (
    <Flex
      align="stretch"
      boxShadow="base"
      flexWrap="wrap"
      rounded="md"
      p={0}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Box
        bg={item.color || useColorModeValue('gray.100', 'gray.700')}
        width="5px"
        borderTopLeftRadius="md"
        borderBottomLeftRadius="md"
      />

      <Stack spacing={1} p={2} width="99%">
        <FormControl as={HStack}>
          <VisuallyHidden>
            <FormLabel>URL:</FormLabel>
          </VisuallyHidden>
          <Icon name="link" />
          <Input
            size="sm"
            type="text"
            variant="flushed"
            resize="none"
            key={item.id}
            ref={actions.register()}
            name={`blocks[${blockIndex}].links[${itemIndex}].url`}
            defaultValue={item.url}
            placeholder="https://example.com"
          />
        </FormControl>

        <FormControl as={HStack}>
          <VisuallyHidden>
            <FormLabel>Title:</FormLabel>
          </VisuallyHidden>
          <Icon name="title" />
          <Input
            size="sm"
            type="text"
            variant="flushed"
            fontWeight="700"
            key={item.id}
            ref={actions.register()}
            name={`blocks[${blockIndex}].links[${itemIndex}].title`}
            defaultValue={item.title}
            placeholder="Link title"
          />
        </FormControl>

        <HStack spacing={3}>
          <FormControl as={HStack}>
            <VisuallyHidden>
              <FormLabel>Category:</FormLabel>
            </VisuallyHidden>
            <ReferenceIcon name={item.category} />
            <Select
              size="sm"
              variant="flushed"
              key={item.id}
              ref={actions.register()}
              name={`blocks[${blockIndex}].links[${itemIndex}].category`}
              defaultValue={item.category}
              placeholder="Select category"
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
            <Icon name="external" />
            <Input
              size="sm"
              type="text"
              variant="flushed"
              key={item.id}
              ref={actions.register()}
              name={`blocks[${blockIndex}].links[${itemIndex}].source`}
              defaultValue={item.source}
              placeholder="Source Name"
            />
          </FormControl>

          <FormControl as={HStack}>
            <VisuallyHidden>
              <FormLabel>Author:</FormLabel>
            </VisuallyHidden>
            <Icon name="author" />
            <Input
              size="sm"
              type="text"
              variant="flushed"
              key={item.id}
              ref={actions.register()}
              name={`blocks[${blockIndex}].links[${itemIndex}].author`}
              defaultValue={item.author}
              placeholder="Author Name"
            />
          </FormControl>

          <FormControl as={HStack}>
            <VisuallyHidden>
              <FormLabel>Color:</FormLabel>
            </VisuallyHidden>
            <Icon name="color" />
            <Input
              size="sm"
              type="text"
              variant="flushed"
              key={item.id}
              ref={actions.register()}
              name={`blocks[${blockIndex}].links[${itemIndex}].color`}
              defaultValue={item.color}
              placeholder="color.500"
            />
          </FormControl>
        </HStack>
      </Stack>
    </Flex>
  )
}
