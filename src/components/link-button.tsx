import NextLink from 'next/link'
import { Button, Link, useColorModeValue } from '@chakra-ui/react'

export default function LinkButton(props) {
  const color = useColorModeValue('white', 'black')
  const bg = useColorModeValue('teal.500', 'teal.200')
  const bgHover = useColorModeValue('teal.600', 'teal.300')

  return (
    <NextLink href={props.href} passHref>
      <Button
        {...props}
        as={Link}
        color={color}
        bg={bg}
        _hover={{ textDecoration: 'none', bg: bgHover }}
      >
        {props.children}
      </Button>
    </NextLink>
  )
}
