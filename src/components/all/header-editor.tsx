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

/**
 * This editor should work with generic data.
 * Item could be a track, topic, or lesson.
 */
export function HeaderEditor({ name, item, register, actions }) {
  return (
    <Flex justify={{ base: 'flex-start', md: 'center' }} py={2} pt={3}>
      <Flex width="1200px" justify="space-between" px={5}>
        <ButtonGroup as={HStack} size="sm" spacing={2}>
          <Button leftIcon={<Icon name="back" />} onClick={actions.handleBack}>
            Back
          </Button>
          <Button
            colorScheme="red"
            leftIcon={<Icon name="delete" />}
            onClick={actions.handleDelete}
          >
            Delete
          </Button>
          <Button
            colorScheme="yellow"
            leftIcon={<Icon name="reset" />}
            onClick={actions.handleReset}
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
          <HStack>
            <Switch
              defaultChecked={item.isPublished}
              name="isPublished"
              ref={register}
              onChange={actions.togglePublishLesson}
            />
            <Text>{item.isPublished ? 'Published' : 'Unpublished'}</Text>
          </HStack>
        </ButtonGroup>

        <ButtonGroup
          as={HStack}
          spacing={2}
          size="sm"
          variant="outline"
          display={{ base: 'none', md: 'flex' }}
        >
          {item.id && (
            <Text>
              Editing {name} #{item.id}
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
