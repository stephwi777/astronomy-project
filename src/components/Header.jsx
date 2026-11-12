import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import LogoMark from './LogoMark.jsx'
import { usePlace } from '../place/usePlace.js'
import { shortName } from '../place/placeNames.js'
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
  const { place, isSample, openPicker } = usePlace()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="bar">
        <Link className="logo" to="/">
          <LogoMark />
          Starling
        </Link>

        <nav aria-label="Main">
          <NavLink to="/tonight">Tonight</NavLink>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/learn">Learn</NavLink>
        </nav>

        <button
          className={isSample ? 'location' : 'location placed'}
          aria-haspopup="dialog"
          onClick={openPicker}
        >
          {isSample ? (
            <>
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
            </>
          ) : (
            <>
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M6 0C2.7 0 0 2.6 0 5.9 0 10.3 6 16 6 16s6-5.7 6-10.1C12 2.6 9.3 0 6 0Zm0 8.2A2.3 2.3 0 1 1 6 3.6a2.3 2.3 0 0 1 0 4.6Z" />
              </svg>
              {shortName(place)}
            </>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
