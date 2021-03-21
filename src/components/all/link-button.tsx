import NextLink from 'next/link'
import { Button } from '@chakra-ui/react'

export function LinkButton(props) {
  return (
    <NextLink passHref href={props.href}>
      <Button as="a" {...props}>
        {props.children}
      </Button>
    </NextLink>
  )
}
