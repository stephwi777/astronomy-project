import { useEffect, useRef, useState } from 'react'



// IN VIEW

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.35 })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export default useInView
