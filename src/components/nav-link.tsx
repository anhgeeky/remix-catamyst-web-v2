import NextLink from 'next/link'
import { chakra, Link, Text } from '@chakra-ui/react'

export default function NavLink({ page }) {
  return (
    <Link as={NextLink} href={page.href} aria-label={page.text}>
      <a className="nav-link">{page.text}</a>
    </Link>
  )
}
