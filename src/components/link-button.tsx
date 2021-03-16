import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'

export default function LinkButton(props) {
  return (
    <NextLink href={props.href} passHref>
      <Button {...props} as="a">
        {props.children}
      </Button>
    </NextLink>
  )
}
