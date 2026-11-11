import { useEffect } from 'react'
import { useLocation } from 'react-router'



// SCROLL TO TOP

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop
