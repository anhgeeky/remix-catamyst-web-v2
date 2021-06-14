import {
  ButtonGroup,
  Button,
  Flex,
  HStack,
  Box,
  Text,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FaCode as CodeIcon,
  FaWindowMaximize as ResultIcon,
} from 'react-icons/fa'

import { LinkButton, Icon } from '@/components'
import { getCompleteDateTime } from '@/utils'

/**
 * This editor should work with generic data.
 * Data could be a track, topic, or lesson.
 */
export function HeaderEditor(props) {
  const { name, data, register, actions } = props

  return (
    <Flex
      justify={{ base: 'flex-start', md: 'center' }}
      p={2}
      pos="fixed"
      left={0}
      bottom={0}
      width="100%"
      zIndex="3"
      borderTop="1px"
      borderTopColor={useColorModeValue('gray.200', 'gray.700')}
      bg={useColorModeValue('white', 'gray.900')}
    >
      <HStack width="1200px" justify="space-between">
        <ButtonGroup
          as={HStack}
          spacing={2}
          size="sm"
          variant="outline"
          display={{ base: 'none', md: 'flex' }}
        >
          {data.id && (
            <Text fontSize="xs">
              <span>
                <b>{name}</b> {data.id}
              </span>
              <span>
                {' '}
                / <b>Created</b> {getCompleteDateTime(data.created_at)}
              </span>
              <span>
                {' '}
                / <b>Updated</b> {getCompleteDateTime(data.updated_at)}
              </span>
            </Text>
          )}
          <Box display="none">
            <Button
              leftIcon={<ResultIcon />}
              onClick={() => actions.handleViewResult()}
            >
              View Result
            </Button>
            <Button
              leftIcon={<CodeIcon />}
              onClick={() => actions.handleViewJSON()}
            >
              View JSON
            </Button>
          </Box>
        </ButtonGroup>

        <ButtonGroup as={HStack} size="xs" spacing={2}>
          <Button leftIcon={<Icon name="back" />} onClick={actions.handleBack}>
            Back
          </Button>
          <LinkButton
            colorScheme="blue"
            leftIcon={<Icon name="view" />}
            href={`/${name}s/${data.slug}`}
          >
            View
          </LinkButton>
          <Button
            onClick={actions.handleDelete}
            colorScheme="red"
            leftIcon={<Icon name="delete" />}
          >
            Delete
          </Button>
          <Button
            onClick={actions.handleReset}
            colorScheme="yellow"
            leftIcon={<Icon name="reset" />}
          >
            Reset
          </Button>
          <Button
            colorScheme="teal"
            leftIcon={<Icon name="save" />}
            onClick={actions.handleSubmit(actions.handleSaveChanges)}
          >
            Save changes
          </Button>

          <VisuallyHidden>
            <Button
              name="is_published"
              ref={register}
              defaultValue={data.is_published || true}
              colorScheme="purple"
              variant={data.is_published ? 'outline' : 'solid'}
              onClick={actions.handleTogglePublish}
            >
              {data.is_published ? 'Unpublish' : 'Publish'}
            </Button>
          </VisuallyHidden>
        </ButtonGroup>
      </HStack>
    </Flex>
  )
}
