import { VStack, Flex, useMediaQuery } from '@chakra-ui/react'

export function ScholarshipHero({ children }) {
  const [isTooSmall] = useMediaQuery('(max-width: 920px)')

  return (
    <Flex pb={5} justify="center">
      <VStack
        width="1200px"
        spacing={5}
        px={isTooSmall ? 5 : 20}
        pt={isTooSmall ? 20 : 40}
      >
        {children}
      </VStack>
    </Flex>
  )
}
