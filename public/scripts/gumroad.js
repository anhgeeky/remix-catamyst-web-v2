/**
 * https://github.com/iamtekeste/gumroad
 */
(function () {
  const Gumroad = {
    init: function () {
      /**
       * Collect all the links to Gumroad products on the page.
       */
      let gumroadLinks = document.querySelectorAll('a[href*="https://gum.co"]')

      gumroadLinks = Array.from(gumroadLinks)
      gumroadLinks.forEach((gumroadLink) => {
        const productLink = gumroadLink.getAttribute('href')
        const displayStyle = gumroadLink.getAttribute('data-display-style')
        const iframeWrapper = Gumroad.createIframeWrapper(displayStyle)
        const iframeToBeLoaded = Gumroad.createIframe(
          gumroadLink,
          iframeWrapper
        )

        /**
         * Handling whether it should be embeded directly,
         * or wait for click on the button and open it as an overlay,
         * the attribute `data-display-style` dictates which style of display (overlay or embed) the user chose.
         */
        if (displayStyle === 'embed') {
          iframeWrapper.classList.add('loading', 'embed')
          iframeToBeLoaded.setAttribute('src', productLink)
        } else {
          gumroadLink.addEventListener('click', (event) => {
            event.preventDefault()
            iframeWrapper.classList.add('loading')
            iframeToBeLoaded.setAttribute('src', productLink)
          })
        }
      })
    },

    createIframeWrapper: (displayStyle) => {
      const iframeWrapper = document.createElement('div')
      iframeWrapper.classList.add('gumroad-iframe-wrapper')
      document.body.appendChild(iframeWrapper)

      // If it is an overlay, clicking on the overlay should dismiss it.
      if (displayStyle !== 'embed') {
        iframeWrapper.addEventListener('click', () => {
          iframeWrapper.classList.remove('loaded')
        })
      }
      return iframeWrapper
    },

    createIframe: (gumroadLink, iframeWrapper) => {
      const gumroadIframe = document.createElement('iframe')
      gumroadIframe.setAttribute('data-src', gumroadLink)
      gumroadIframe.classList.add('gumroad-iframe')

      // Setup iframe load event listener
      gumroadIframe.addEventListener('load', () => {
        const iframeSrc = gumroadIframe.getAttribute('src')
        if (iframeSrc) {
          iframeWrapper.classList.remove('loading')
          iframeWrapper.classList.add('loaded')
        }
        // After it is done loading if it is an embedable form hide the source link
        const displayStyle = gumroadLink.getAttribute('data-display-style')
        if (displayStyle === 'embed') {
          gumroadLink.style.display = 'none'
        }
      })

      iframeWrapper.appendChild(gumroadIframe)
      return gumroadIframe
    },
  }

  Gumroad.init()
})()
