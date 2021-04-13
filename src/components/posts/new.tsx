import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Stack,
  VStack,
  Textarea,
  Input,
} from '@chakra-ui/react'

import { Icon, LinkButton } from '@components'
import { RichTextEditor } from '@components/editor'

export function PostNew() {
  const htmlString =
    '<p>Hey! Write your post content here.</p><p>You can write it as a blog post, notes, tutorial, publication, announcement, news, or a changelog.</p><p>Feel free to delete this help text.</p>'

  const handleSave = () => {
    console.info('>>> Handle save for debugging.')
  }

  return (
    <Flex justify="center">
      <VStack>
        <Stack maxW={760} width="100%">
          <ButtonGroup size="sm">
            <Button
              colorScheme="teal"
              // onClick={handlePublish}
              leftIcon={<Icon name="publish" />}
            >
              Publish post
            </Button>
            <Button
              colorScheme="blue"
              // onClick={handleSave}
              leftIcon={<Icon name="save" />}
            >
              Save
            </Button>
            <LinkButton href="/dashboard/posts">Cancel</LinkButton>
          </ButtonGroup>

          <Input
            // ref={register}
            isRequired
            name="title"
            size="lg"
            fontFamily="heading"
            fontWeight="700"
            fontSize="4xl"
            variant="unstyled"
            py={3}
            placeholder="New post title..."
            aria-placeholder="Enter the post title"
          />

          <Input
            // ref={register}
            name="subtitle"
            size="lg"
            fontSize="2xl"
            variant="unstyled"
            py={3}
            placeholder="Put a subtitle text..."
            aria-placeholder="Enter the subtitle text"
          />
        </Stack>

        <FormControl as={Stack}>
          <RichTextEditor handleSave={handleSave} htmlString={htmlString} />
        </FormControl>
      </VStack>
    </Flex>
  )
}
