import { useEffect } from 'react'
import NextHead from 'next/head'
import { Link, useColorModeValue } from '@chakra-ui/react'

export function GumroadButton({ productId, children }) {
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
      <Link
        className="gumroad-button"
        href={`https://gum.co/${productId}?wanted=true`}
        data-display-style="overlay"
        rounded="md"
        boxShadow={useColorModeValue(
          '0 0 2px rgba(0, 0, 0, 0.4)',
          '0 0 2px rgba(255, 255, 255, 0.4)'
        )}
        bg={useColorModeValue('white', 'gray.900')}
        bgImage={`url(https://gumroad.com/button/button_bar.jpg)`}
        backgroundRepeat="repeat-x"
        _hover={{ textDecoration: 'none' }}
      >
        {children}
      </Link>
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
