import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
  Switch,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'

import { Icon, CardArea } from '@components'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

/**
 * Block only can be used for CMS.
 */
export function CMSBlockQuote(props) {
  const { index, block, actions } = props

  if (!block) {
    return <p>Loading quote...</p>
  }

  /**
   * Quote
   * block.is_published
   * block.text
   * block.author
   * block.cite_url
   */
  return (
    <CardArea>
      <CMSBlockModifierButtons {...props}>
        <HStack>
          <FormControl as={HStack}>
            <Switch
              key={block.id}
              ref={actions.register()}
              name={`blocks[${index}].is_published`}
              defaultChecked={block.is_published}
            />
            <FormLabel fontSize="sm">Published?</FormLabel>
          </FormControl>
        </HStack>
      </CMSBlockModifierButtons>

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
          <HStack spacing={3}>
            <FormControl as={HStack} align="flex-start">
              <VisuallyHidden>
                <FormLabel>Text:</FormLabel>
              </VisuallyHidden>
              <Box pt={3}>
                <Icon name="quote" />
              </Box>
              <Textarea
                key={block.id}
                ref={actions.register()}
                name={`blocks[${index}].text`}
                defaultValue={block.text}
                placeholder="Quote text"
                size="md"
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
                ref={actions.register()}
                name={`blocks[${index}].author`}
                defaultValue={block.author}
                placeholder="Quote author"
                size="sm"
                type="text"
                variant="flushed"
              />
            </FormControl>
          </HStack>

          <HStack>
            <FormControl as={HStack}>
              <VisuallyHidden>
                <FormLabel>Cite URL:</FormLabel>
              </VisuallyHidden>
              <Icon name="url" />
              <Input
                key={block.id}
                ref={actions.register()}
                name={`blocks[${index}].cite_url`}
                defaultValue={block.cite_url}
                placeholder="https://source.com"
                size="sm"
                type="text"
                variant="flushed"
                resize="none"
              />
            </FormControl>
          </HStack>
        </Stack>
      </Flex>
    </CardArea>
  )
}
