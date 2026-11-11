import { useEffect, useRef, useState } from 'react'



// IN VIEW

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.5) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.5, rootMargin: '0px 0px -20% 0px' })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export default useInView
