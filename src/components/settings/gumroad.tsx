import { useEffect } from 'react'
import NextHead from 'next/head'
// import Script from 'react-load-script'

export function SettingsGumroad() {
  // const script = document.createElement('script')
  // script.src = 'https://gumroad.com/js/gumroad.js'
  // script.async = true
  // document.body.appendChild(script)

  // useEffect(() => {
  //   const script = document.createElement('script')
  //   script.src = 'https://gumroad.com/js/gumroad.js'
  //   script.async = true
  //   document.body.appendChild(script)
  //   return () => {
  //     document.body.removeChild(script)
  //   }
  // }, [])

  return (
    <NextHead>
      <script async src="https://gumroad.com/js/gumroad.js"></script>
    </NextHead>
  )
}
