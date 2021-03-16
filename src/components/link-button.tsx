import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'

export default function LinkButton(props) {
  return (
    <NextLink href={props.href} passHref>
      <Button as="a" {...props}>
        {props.children}
      </Button>
    </NextLink>
  )
}
