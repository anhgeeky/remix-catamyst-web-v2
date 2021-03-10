import {
  Badge,
  Box,
  Divider,
  HStack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export function CMSBlockDivider({ block }) {
  return (
    <Box maxW={800} width="100%">
      <Divider opacity={1} mb={1} />
      <HStack opacity={0.1} _hover={{ opacity: 1 }} justify="space-between">
        <Badge colorScheme="teal">Divider</Badge>
        <Tooltip size="xs" label="Delete divider">
          <IconButton
            size="xs"
            aria-label="Delete divider"
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        </Tooltip>
      </HStack>
    </Box>
  )
}
