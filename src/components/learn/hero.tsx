import { Stack, Flex, useColorModeValue } from '@chakra-ui/react'

export function LearnHero(props) {
  const color = props.color || 'cyan'
  const textColor = useColorModeValue(`${color}.900`, `${color}.100`)
  const bg = useColorModeValue(`${color}.100`, `${color}.900`)

  return (
    <Flex py={10} color={textColor} bg={bg} justify="center">
      <Stack px={5} width="1200px" {...props}>
        {props.children}
      </Stack>
    </Flex>
  )
}
