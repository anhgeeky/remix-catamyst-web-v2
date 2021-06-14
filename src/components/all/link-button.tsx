import NextLink from 'next/link'
import { Breadcrumb, BreadcrumbItem, Button } from '@chakra-ui/react'

export function LinkButton(props) {
  if (props.href) {
    return (
      <NextLink passHref href={props.href}>
        <Button as="a" {...props}>
          {props.children}
        </Button>
      </NextLink>
    )
  } else {
    return (
      <Button as="a" {...props}>
        {props.children}
      </Button>
    )
  }
}

export function BreadcrumbLinkButtons({ breadcrumbs }) {
  return (
    <Breadcrumb>
      {breadcrumbs.map((link, index) => {
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLinkButton href={link.href}>
              {link.title}
            </BreadcrumbLinkButton>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export function BreadcrumbLinkButton(props) {
  if (props.href) {
    return (
      <NextLink passHref href={props.href}>
        <Button
          size="xs"
          as="a"
          variant="ghost"
          colorScheme="teal"
          // leftIcon={<Icon name="back" />}
          {...props}
        >
          {props.children}
        </Button>
      </NextLink>
    )
  } else {
    return (
      <Button size="xs" as="a" {...props}>
        {props.children}
      </Button>
    )
  }
}
