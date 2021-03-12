import {
  Box,
  Badge,
  Button,
  ButtonGroup,
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

import { ColorModeToggle, CardArea, Icon, RichTextEditor } from '@components'
import { BlockTexts } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

export function CMSBlockTexts({ block, actions }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <CardArea>
        <CMSBlockModifierButtons name="Texts" block={block} actions={actions}>
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
      title: 'Saved texts!',
      status: 'success',
    })
  }

  const handleLoad = () => {
    toast({
      title: 'Loaded texts!',
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
            <Badge colorScheme="teal">Rich Text Editor</Badge>
            <ButtonGroup size="xs">
              <ColorModeToggle />
              <Button
                colorScheme="teal"
                leftIcon={<Icon name="save" />}
                onClick={handleSave}
              >
                Save to JSON
              </Button>
              <Button
                colorScheme="yellow"
                leftIcon={<Icon name="save" />}
                onClick={handleLoad}
              >
                Load to Slate
              </Button>
            </ButtonGroup>
          </HStack>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody align="center" p={0}>
          <Box maxW="760px" width="100%">
            <RichTextEditor handleSave={handleSave} htmlString={block.html} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
