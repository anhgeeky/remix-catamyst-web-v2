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
} from '@chakra-ui/react'

import { ColorModeToggle, CardArea, Icon, useToast } from '@components'
import { RichTextEditor } from '@components/editor'
import { BlockTexts } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'

export function CMSBlockTexts(props) {
  const { index, block, actions } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <CardArea>
        <CMSBlockModifierButtons {...props}>
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
  const toast = useToast({ duration: 300 })

  const handleSave = () => {
    toast({
      title: 'Saved texts!',
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
              <Button
                colorScheme="teal"
                leftIcon={<Icon name="save" />}
                onClick={handleSave}
              >
                Save Texts
              </Button>
            </ButtonGroup>
          </HStack>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody align="center" p={0}>
          <Box maxW={760} width="100%">
            <RichTextEditor handleSave={handleSave} htmlString={block.html} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
