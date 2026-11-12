import { Link } from 'react-router'
import Stars from '../components/Stars.jsx'
import './Credits.css'



// PLANETS

const planets = {
  ringed: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <clipPath id="ringed-clip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <ellipse cx="50" cy="60" rx="61" ry="13" transform="rotate(-12 50 60)" fill="none" stroke="var(--mist)" strokeWidth="4.5" />
      <circle cx="50" cy="50" r="50" fill="var(--bronze)" />
      <g clipPath="url(#ringed-clip)" stroke="#c48f4c" strokeWidth="6">
        <path d="M0 12 H100" />
        <path d="M0 88 H100" />
      </g>
      <path d="M-11 60 A61 13 0 0 0 111 60" transform="rotate(-12 50 60)" fill="none" stroke="var(--mist)" strokeWidth="4.5" />
    </svg>
  ),
  cloudy: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <clipPath id="cloudy-clip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <circle cx="50" cy="50" r="50" fill="var(--teal)" />
      <g clipPath="url(#cloudy-clip)" stroke="var(--frost)" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round">
        <path d="M8 14 H58" />
        <path d="M44 88 H96" />
      </g>
      <circle cx="98" cy="8" r="6" fill="var(--mist)" />
    </svg>
  ),
  aurora: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <clipPath id="aurora-clip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <circle cx="50" cy="50" r="50" fill="#3d3590" />
      <path clipPath="url(#aurora-clip)" d="M0 0 H100 V14 Q90 9 82 15 Q72 22 62 14 Q52 7 42 15 Q32 22 22 14 Q12 8 0 14 Z" fill="var(--teal)" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="var(--moon)" />
      <g fill="#ecdcba">
        <circle cx="24" cy="22" r="7" />
        <circle cx="80" cy="72" r="5" />
        <circle cx="30" cy="84" r="4" />
        <circle cx="76" cy="20" r="3" />
      </g>
    </svg>
  ),
  night: (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="var(--far-hills)" stroke="var(--snow)" strokeOpacity="0.5" strokeWidth="1.5" />
      <g fill="var(--beak)">
        <circle cx="10" cy="40" r="1.2" />
        <circle cx="13" cy="47" r="0.9" />
        <circle cx="88" cy="30" r="1.1" />
        <circle cx="90" cy="62" r="1.2" />
        <circle cx="72" cy="90" r="0.9" />
        <circle cx="24" cy="86" r="1.1" />
        <circle cx="50" cy="6" r="0.9" />
        <circle cx="8" cy="58" r="0.9" />
      </g>
    </svg>
  ),
}



// SOURCES

const sources = [
  {
    planet: 'ringed',
    tone: 'dark',
    size: '300px',
    name: 'Astronomy Engine',
    use: 'Works out where the Sun, Moon, planets and stars are in your sky.',
    credits: [
      { text: 'MIT License, by Don Cross', href: 'https://github.com/cosinekitty/astronomy' },
    ],
  },
  {
    planet: 'cloudy',
    tone: 'dark',
    size: '310px',
    name: 'Open-Meteo',
    use: 'Cloud cover forecasts, plus the place search for setting your location.',
    credits: [
      { text: 'Weather data by Open-Meteo.com, CC BY 4.0', href: 'https://open-meteo.com' },
      { text: 'Place names from GeoNames, CC BY 4.0', href: 'https://www.geonames.org' },
    ],
  },
  {
    planet: 'aurora',
    tone: 'light',
    size: '320px',
    name: 'NOAA Space Weather Prediction Center',
    use: 'The Kp index and aurora forecasts for the northern lights.',
    credits: [
      { text: 'Public domain, U.S. government work', href: 'https://www.swpc.noaa.gov' },
    ],
  },
  {
    planet: 'moon',
    tone: 'dark',
    size: '300px',
    name: 'NASA Astronomy Picture of the Day',
    use: 'A new picture of our universe every day, explained by an astronomer.',
    credits: [
      { text: 'Each picture’s credit appears with it', href: 'https://apod.nasa.gov' },
    ],
  },
  {
    planet: 'night',
    tone: 'light',
    size: '360px',
    name: 'Leaflet, Black Marble and OpenStreetMap',
    use: 'The map, Earth’s city lights at night, and nearby observatories.',
    credits: [
      { text: 'Leaflet, BSD 2-Clause License', href: 'https://leafletjs.com' },
      { text: 'Black Marble, NASA Earth Observatory', href: 'https://earthobservatory.nasa.gov/features/NightLights' },
      { text: '© OpenStreetMap contributors, ODbL', href: 'https://www.openstreetmap.org/copyright' },
    ],
  },
]



// CREDITS

function Credits() {
  return (
    <main className="sky">
      <title>Sky data credits | Starling</title>
      <Stars />

      <section className="credits">
        <div className="inner">
          <h1>Where our sky data comes from</h1>
          <p className="intro">Starling is built on generous open projects and public science. Here’s who to thank!</p>

          <ul className="sources">
            {sources.map((source, i) => (
              <li
                key={source.name}
                className={`${source.tone} planet-${source.planet}`}
                style={{ '--size': source.size, '--delay': `${i * -1.4}s` }}
              >
                {planets[source.planet]}
                <h2>{source.name}</h2>
                <p>{source.use}</p>
                <ul className="licenses">
                  {source.credits.map(credit => (
                    <li key={credit.href}>
                      <a href={credit.href}>{credit.text}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="built-with">
            <h2>Built with</h2>
            <p>React, Vite and React Router, with the Fraunces and Nunito Sans typefaces (SIL Open Font License) from Google Fonts.</p>
            <p>Spotted a missing credit? <Link to="/contact">Let us know</Link>.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Credits
