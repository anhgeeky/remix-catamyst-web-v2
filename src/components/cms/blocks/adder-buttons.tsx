import {
  Flex,
  Tooltip,
  ButtonGroup,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { Card } from '@components'
import { AddIcon } from '@chakra-ui/icons'
import {
  FaCode as CodeIcon,
  FaDivide as DividerIcon,
  FaExternalLinkAlt as LinksIcon,
  FaFont as TextsIcon,
  FaImage as ImageIcon,
  FaList as ListIcon,
} from 'react-icons/fa'

/**
 * CMS Adder Buttons to add more block into CMS lesson editor
 */
export function CMSBlockAdderButtons() {
  const toast = useToast({ duration: 1000, position: 'bottom' })

  const addBlockImage = () => {
    try {
      toast({ title: 'Added new block!', status: 'success' })
    } catch (error) {
      toast({ title: 'Add block error!', status: 'error' })
    }
  }

  const addBlockTexts = () => {
    try {
      toast({ title: 'Added new reference!', status: 'success' })
    } catch (error) {
      toast({ title: 'Add reference error!', status: 'error' })
    }
  }

  return (
    <ButtonGroup
      as={Flex}
      justify="center"
      align="center"
      size="sm"
      py={2}
      width="100%"
      maxW={800}
      opacity={0.1}
      _hover={{ opacity: 1 }}
    >
      <Tooltip hasArrow label="Add Image">
        <IconButton aria-label="Add image block" icon={<ImageIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Add Texts">
        <IconButton aria-label="Add texts block" icon={<TextsIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Add List">
        <IconButton aria-label="Add list block" icon={<ListIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Add Links">
        <IconButton aria-label="Add links block" icon={<LinksIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Add Code">
        <IconButton aria-label="Add code block" icon={<CodeIcon />} />
      </Tooltip>
      <Tooltip hasArrow label="Add Divider">
        <IconButton aria-label="Add divider block" icon={<DividerIcon />} />
      </Tooltip>
    </ButtonGroup>
  )
}

/**
 * CMS Adder Buttons just for CMS lesson references
 */
export function AddReferenceButton() {
  const toast = useToast({ duration: 1000, position: 'bottom' })

  return (
    <ButtonGroup
      as={Flex}
      justify="center"
      align="center"
      size="sm"
      py={2}
      width="100%"
      maxW={800}
      opacity={0.1}
      _hover={{ opacity: 1 }}
    >
      <Tooltip hasArrow label="Add reference link">
        <IconButton
          aria-label="Add reference link block"
          icon={<LinksIcon />}
        />
      </Tooltip>
    </ButtonGroup>
  )
}
