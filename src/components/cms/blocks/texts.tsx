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
  useColorModeValue,
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
  const toast = useToast({ position: 'top', duration: 300 })
  const handleSave = () => {
    toast({
      title: 'Texts are saved!',
      status: 'success',
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="inside"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />

      <ModalContent
        margin={0}
        maxH="100%"
        bg={useColorModeValue('white', 'gray.900')}
      >
        <ModalHeader pt={1} px={2} pb={2}>
          <HStack>
            <Badge colorScheme="teal">Texts Editor</Badge>
            <Button
              size="xs"
              colorScheme="teal"
              leftIcon={<Icon name="save" />}
              onClick={handleSave}
            >
              Save
            </Button>
          </HStack>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody align="center" p={0}>
          <Box maxW="760px" width="100%">
            <RichTextEditor htmlString={block.html} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
