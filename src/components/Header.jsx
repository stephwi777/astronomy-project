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
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="26" r="20" fill="var(--far-hills)" />

            <g className="bird">
              <path d="M14 31 L5.5 35.5 Q6 38 9 38 L15.5 35 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="21" cy="31" r="10" fill="var(--ink)" />
              <circle cx="27.5" cy="21" r="7" fill="var(--ink)" />
              <ellipse cx="18.5" cy="31" rx="7" ry="4.6" transform="rotate(-25 18.5 31)" fill="#3d3590" />

              <g fill="var(--snow)">
                <circle cx="27.5" cy="28.5" r="0.9" />
                <circle cx="25" cy="32.5" r="0.9" />
                <circle cx="28.5" cy="33" r="0.9" />
              </g>

              <path d="M33.5 19.5 L40 16.2 L34 23 Z" fill="var(--beak)" stroke="var(--beak)" strokeLinejoin="round" />
              <circle cx="29.6" cy="19.8" r="1.5" fill="var(--frost)" />
            </g>

            <path className="badge-star" d="M40 1.5 Q41.2 6.8 46.5 8 Q41.2 9.2 40 14.5 Q38.8 9.2 33.5 8 Q38.8 6.8 40 1.5 Z" fill="var(--beak)" />
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
