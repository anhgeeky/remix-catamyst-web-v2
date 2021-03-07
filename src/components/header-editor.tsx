import { useRouter } from 'next/router'
import { ButtonGroup, Button, Flex, HStack, Link, Text } from '@chakra-ui/react'
import React from 'react'
import {
  ArrowBackIcon as BackIcon,
  EditIcon as SaveIcon,
} from '@chakra-ui/icons'

/**
 * This editor should work with generic data
 */

export default function HeaderEditor({ handleSave, name, item }) {
  const router = useRouter()

  return (
    <Flex py={2} justify={{ base: 'flex-start', md: 'center' }}>
      <ButtonGroup as={HStack} width="1200px" spacing={2} px={5}>
        <Button leftIcon={<BackIcon />} onClick={() => router.back()}>
          Back
        </Button>
        <Button
          leftIcon={<SaveIcon />}
          colorScheme="teal"
          onClick={() => handleSave()}
        >
          Save
        </Button>
        <Text>
          Editing {name} #{item.id}
        </Text>
      </ButtonGroup>
    </Flex>
  )
}
