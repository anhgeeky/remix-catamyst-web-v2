import { useState } from 'react'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VisuallyHidden,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import { CardArea, Icon, useToast } from '@components'
import { RichTextEditor } from '@components/editor'
import { BlockTextsPreview } from '@components/blocks'
import { CMSBlockModifierButtons } from '@components/cms/blocks'
import blocks from '@data/blocks'

export function CMSBlockTexts(props) {
  const {
    index,
    block,
    actions: { register, setValue },
  } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  /**
   * This state should be higher enough to be used for both
   * BlockTextsPreview and CMSBlockTextsModal/RichTextEditor
   */
  const [htmlString, setHtmlString] = useState(block.html)

  return (
    <>
      <CardArea>
        <CMSBlockModifierButtons {...props}>
          <Button size="xs" leftIcon={<Icon name="edit" />} onClick={onOpen}>
            Open Editor
          </Button>
        </CMSBlockModifierButtons>

        {/* This is a quick solution to have name="blocks[index].html" */}
        <VisuallyHidden>
          <Input
            key={block.id}
            ref={register()}
            name={`blocks[${index}].html`}
            defaultValue={block.html || ''}
            type="text"
          />
        </VisuallyHidden>

        {!htmlString && <Text opacity={0.25}>No content yet.</Text>}
        {htmlString && <BlockTextsPreview htmlString={htmlString} />}
      </CardArea>

      <CMSBlockTextsModal
        index={index}
        block={block}
        isOpen={isOpen}
        onClose={onClose}
        setValue={setValue}
        htmlString={htmlString}
        setHtmlString={setHtmlString}
      />
    </>
  )
}

/**
 * The CMS Texts that can handle save.
 * Similar with @components/editor/experiment
 */
function CMSBlockTextsModal({
  index,
  block,
  isOpen,
  onClose,
  setValue,
  htmlString,
  setHtmlString,
}) {
  const toast = useToast()

  const handleSave = async () => {
    // Update in RHF field array
    setValue(`blocks[${index}].html`, htmlString)
    toast({ title: 'Saved texts!', status: 'success' })
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
        <HStack pt={2} pb={2} pl={3} pr={12} justify="space-between">
          <Badge colorScheme="teal">Rich Text Editor</Badge>

          <Button
            size="sm"
            colorScheme="teal"
            leftIcon={<Icon name="save" />}
            onClick={handleSave}
          >
            Save Texts
          </Button>

          {/* Close button position is fixed */}
          <ModalCloseButton />
        </HStack>

        <ModalBody align="center" p={0}>
          <Box maxW={760} width="100%">
            <RichTextEditor
              htmlString={htmlString || '<p>Insert content here.</p>'}
              setHtmlString={setHtmlString}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
