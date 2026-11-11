import { useEffect, useState } from 'react'
import LogoMark from './LogoMark.jsx'
import './Header.css'



// SPARKLES

const sparkles = [
  { x: '9%', y: '-4%', size: '12px', color: 'var(--beak)', delay: '0s', duration: '1.7s' },
  { x: '46%', y: '-12%', size: '9px', color: '#ffe08a', delay: '0.7s', duration: '2.1s' },
  { x: '89%', y: '0%', size: '13px', color: 'var(--beak)', delay: '0.25s', duration: '1.9s' },
  { x: '101%', y: '52%', size: '10px', color: '#ffe08a', delay: '1.1s', duration: '1.6s' },
  { x: '72%', y: '106%', size: '9px', color: 'var(--beak)', delay: '0.45s', duration: '2s' },
  { x: '18%', y: '102%', size: '11px', color: '#ffe08a', delay: '0.9s', duration: '1.8s' },
]



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
          <LogoMark />
          Starling
        </a>

        <nav aria-label="Main">
          <a href="tonight">Tonight</a>
          <a href="calendar">Calendar</a>
          <a href="map">Map</a>
          <a href="learn">Learn</a>
        </nav>

        <button className="location">
          Set location
          <span className="sparkles" aria-hidden="true">
            {sparkles.map((sparkle, i) => (
              <svg
                key={i}
                viewBox="0 0 14 14"
                style={{
                  '--x': sparkle.x,
                  '--y': sparkle.y,
                  '--size': sparkle.size,
                  '--color': sparkle.color,
                  '--delay': sparkle.delay,
                  '--duration': sparkle.duration,
                }}
              >
                <path d="M7 0 Q8 6 14 7 Q8 8 7 14 Q6 8 0 7 Q6 6 7 0 Z" />
              </svg>
            ))}
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
