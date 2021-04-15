import { useEffect } from 'react'
import NextHead from 'next/head'
import { Button, Link } from '@chakra-ui/react'

export function GumroadButton({
  productId = 'catamyst-pro',
  email = 'you@mail.com',
  leftIcon,
  children,
}) {
  const encoded_email = encodeURIComponent(email)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/scripts/gumroad.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Button
        as={Link}
        className="gumroad-button"
        colorScheme="teal"
        href={`https://gum.co/${productId}?email=${encoded_email}`}
        data-display-style="overlay"
        leftIcon={leftIcon}
        size="lg"
      >
        {children}
      </Button>
    </>
  )
}

export function GumroadScript() {
  const script = document.createElement('script')
  script.async = true
  script.type = 'text/javascript'
  script.src = 'https://gumroad.com/js/gumroad.js'
  document.body.appendChild(script)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/scripts/gumroad.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <NextHead>
      <script
        async
        type="text/javascript"
        src="https://gumroad.com/js/gumroad.js"
      />
    </NextHead>
  )
}
