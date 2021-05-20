import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Input,
  Select,
  Stack,
  VisuallyHidden,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react'

import { Icon, CardArea, ReferenceIcon } from '@components'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

/**
 * Block only can be used for CMS.
 */
export function CMSBlockLinks(props) {
  const { index, block, actions } = props

  return (
    <CardArea>
      {block.isReferences && <Heading as="h1">References</Heading>}
      <Heading as="h1">References</Heading>

      <CMSBlockModifierButtons {...props}>
        <Button
          size="xs"
          leftIcon={<Icon name="add" />}
          onClick={() => console.info('>>> Added new link')}
        >
          Add new link
        </Button>
      </CMSBlockModifierButtons>

      {block?.links &&
        block?.links?.map((link, index) => {
          return <LinkItem key={index} link={link} />
        })}
    </CardArea>
  )
}

export function LinkItem({ link }) {
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
        bg={link.color || useColorModeValue('gray.100', 'gray.700')}
        width="5px"
        borderTopLeftRadius="md"
        borderBottomLeftRadius="md"
      />

      <Stack spacing={1} p={2} width="99%">
        {/* Need Link-specific modifer buttons without is_published */}
        {/* <CMSBlockModifierButtons block={link} name="Link" /> */}

        <FormControl as={HStack}>
          <VisuallyHidden>
            <FormLabel>URL:</FormLabel>
          </VisuallyHidden>
          <Icon name="link" />
          <Input
            name="external"
            size="sm"
            type="text"
            variant="flushed"
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
            <ReferenceIcon name={link.category} />
            <Select
              name="category"
              size="sm"
              variant="flushed"
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
            <Icon name="external" />
            <Input
              name="source"
              size="sm"
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
            <Icon name="author" />
            <Input
              name="author"
              size="sm"
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
            <Icon name="color" />
            <Input
              name="title"
              size="sm"
              type="text"
              variant="flushed"
              defaultValue={link.color}
              placeholder="color.500"
            />
          </FormControl>
        </HStack>
      </Stack>
    </Flex>
  )
}
