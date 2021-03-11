import { useRouter } from 'next/router'
import { ButtonGroup, Button, Flex, HStack, Box, Text } from '@chakra-ui/react'
import {
  FaCode as CodeIcon,
  FaWindowMaximize as ResultIcon,
} from 'react-icons/fa'

import { Icon } from '@components'

/**
 * This editor should work with generic data
 */

export default function HeaderEditor({
  name = 'Unknown',
  item,
  handleReset = () => {},
  handleSave = () => {},
  handleViewResult = () => {},
  handleViewJSON = () => {},
}) {
  const router = useRouter()

  return (
    <Flex justify={{ base: 'flex-start', md: 'center' }} py={2} pt={3}>
      <Flex width="1200px" justify="space-between" px={5}>
        <ButtonGroup as={HStack} spacing={2}>
          <Button leftIcon={<Icon name="back" />} onClick={() => router.back()}>
            Back
          </Button>
          <Button
            leftIcon={<Icon name="reset" />}
            onClick={() => handleReset()}
          >
            Reset
          </Button>
          <Button
            leftIcon={<Icon name="save" />}
            colorScheme="teal"
            onClick={() => handleSave()}
          >
            Save Changes
          </Button>
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
          <Button leftIcon={<ResultIcon />} onClick={() => handleViewResult()}>
            View Result
          </Button>
          <Button leftIcon={<CodeIcon />} onClick={() => handleViewJSON()}>
            View JSON
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}
