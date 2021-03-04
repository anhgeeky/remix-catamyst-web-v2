import NextLink from 'next/link'
import { Button, Link, useColorModeValue } from '@chakra-ui/react'

export default function LinkButton(props) {
  const bg = useColorModeValue('gray.100', 'gray.800')

  return (
    <NextLink href={props.href} passHref>
      <Button as={Link} {...props} _hover={{ textDecoration: 'none', bg }}>
        {props.children}
      </Button>
    </NextLink>
  )
}
