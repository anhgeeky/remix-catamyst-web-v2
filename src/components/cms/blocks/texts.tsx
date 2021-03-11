import {
  Box,
  Button,
  Badge,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { CardArea, Icon, RichTextEditor } from '@components'
import { BlockTexts } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

export function CMSBlockTexts({ block }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <CardArea>
        <CMSBlockModifierButtons name="Texts">
          <Switch size="sm" name="isPublished" value={block.isPublished} />
          <Button size="xs" leftIcon={<Icon name="edit" />} onClick={onOpen}>
            Open Editor
          </Button>
        </CMSBlockModifierButtons>
        <BlockTexts block={block} />
      </CardArea>

      <CMSBlockModal block={block} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

function CMSBlockModal({ block, isOpen, onClose }) {
  const toast = useToast()
  const handleSave = () => {
    toast({
      title: 'Texts are saved!',
      status: 'success',
      position: 'top',
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size="full"
    >
      <ModalOverlay />

      <ModalContent maxH="100%" margin={0}>
        <ModalHeader>
          <HStack>
            <Badge colorScheme="teal">Texts Editor</Badge>
            <Button
              size="sm"
              colorScheme="teal"
              leftIcon={<Icon name="save" />}
              onClick={handleSave}
            >
              Save
            </Button>
          </HStack>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody align="center">
          <Box maxW="760px" width="100%" px={5}>
            <RichTextEditor htmlString={block.html} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
