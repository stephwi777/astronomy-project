import { useEffect, useState } from 'react'
import './Header.css'



// HEADER

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="bar">
        <a className="logo" href="#">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="20" fill="var(--far-hills)" />
            <path d="M20 8 Q21.6 18.4 32 20 Q21.6 21.6 20 32 Q18.4 21.6 8 20 Q18.4 18.4 20 8 Z" fill="var(--beak)" />
          </svg>
          Starling
        </a>

        <nav aria-label="Main">
          <a href="tonight">Tonight</a>
          <a href="calendar">Calendar</a>
          <a href="map">Map</a>
          <a href="learn">Learn</a>
        </nav>

        <button className="location">Set location</button>
      </div>
    </header>
  )
}

export default Header
