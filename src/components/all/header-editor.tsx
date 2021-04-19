import {
  ButtonGroup,
  Switch,
  Button,
  Flex,
  HStack,
  Box,
  Text,
} from '@chakra-ui/react'
import {
  FaCode as CodeIcon,
  FaWindowMaximize as ResultIcon,
} from 'react-icons/fa'

import { Icon } from '@components'
import { getCompleteDateTime } from '@utils'

/**
 * This editor should work with generic data.
 * Data could be a track, topic, or lesson.
 */
export function HeaderEditor({ name, data, register, actions }) {
  return (
    <Flex justify={{ base: 'flex-start', md: 'center' }} py={2} pt={3}>
      <Flex width="1200px" justify="space-between" px={5}>
        <ButtonGroup as={HStack} size="xs" spacing={2}>
          <Button leftIcon={<Icon name="back" />} onClick={actions.handleBack}>
            Back
          </Button>
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
            onClick={actions.handleSubmit(actions.handleSave)}
          >
            Save changes
          </Button>
          <Button onClick={actions.togglePublishLesson}>
            {data.is_published ? 'Publish' : 'Unpublish'}
          </Button>
        </ButtonGroup>

        <ButtonGroup
          as={HStack}
          spacing={2}
          size="sm"
          variant="outline"
          display={{ base: 'none', md: 'flex' }}
        >
          {data.id && (
            <Text fontSize="xs">
              {data.id}
              <span> / Created {getCompleteDateTime(data.created_at)}</span>
              <span> / Updated {getCompleteDateTime(data.updated_at)}</span>
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
      </Flex>
    </Flex>
  )
}
