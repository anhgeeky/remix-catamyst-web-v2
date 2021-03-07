import { useRouter } from 'next/router'
import { ButtonGroup, Button, Flex, HStack, Box, Text } from '@chakra-ui/react'
import React from 'react'
import {
  ArrowBackIcon as BackIcon,
  EditIcon as SaveIcon,
} from '@chakra-ui/icons'
import {
  FaCode as CodeIcon,
  FaWindowMaximize as ResultIcon,
} from 'react-icons/fa'

/**
 * This editor should work with generic data
 */

export default function HeaderEditor({
  name,
  item,
  handleSave,
  handleViewResult,
  handleViewJSON,
}) {
  const router = useRouter()

  return (
    <Flex justify={{ base: 'flex-start', md: 'center' }} py={2} pt={3}>
      <Flex width="1200px" justify="space-between" px={5}>
        <ButtonGroup as={HStack} spacing={2}>
          <Button leftIcon={<BackIcon />} onClick={() => router.back()}>
            Back
          </Button>
          <Button
            leftIcon={<SaveIcon />}
            colorScheme="teal"
            onClick={() => handleSave()}
          >
            Save Changes
          </Button>
        </ButtonGroup>
        <ButtonGroup
          as={HStack}
          spacing={2}
          display={{ base: 'none', md: 'flex' }}
        >
          <Text>
            Editing {name} #{item.id}
          </Text>
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
