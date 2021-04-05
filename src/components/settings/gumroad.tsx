import { useEffect } from 'react'
import NextHead from 'next/head'

export function SettingsGumroad() {
  // const script = document.createElement('script')
  // script.async = true
  // script.type = 'text/javascript'
  // script.src = 'https://gumroad.com/js/gumroad.js'
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
      <script
        type="text/javascript"
        src="https://gumroad.com/js/gumroad.js"
      ></script>
    </NextHead>
  )
}

export function PayProButton() {
  return (
    <a
      href="https://gum.co/catamyst-pro?wanted=true"
      data-gumroad-single-product="true"
      className="gumroad-button"
      target="_blank"
    >
      $10 per month
    </a>
  )
}

export function PaySuperButton() {
  return (
    <a
      href="https://gum.co/catamyst-super?wanted=true"
      data-gumroad-single-product="true"
      className="gumroad-button"
      target="_blank"
    >
      $2000 one-time fee
    </a>
  )
}
