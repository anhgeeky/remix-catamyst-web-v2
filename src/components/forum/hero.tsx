import contrast from 'contrast'
import { Box, Flex } from '@chakra-ui/react'

export function ForumHero({ section, children }) {
  return (
    <Flex
      py={5}
      justify="center"
      color={
        section.color && contrast(section.color) === 'light' ? 'black' : 'white'
      }
      bg={section.color ? section.color : 'gray.500'}
      bgGradient={section.gradient}
    >
      <Box px={5} width="1200px">
        {children}
      </Box>
    </Flex>
  )
}
