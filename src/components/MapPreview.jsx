import './MapPreview.css'



// PLACES

const places = [
  { name: 'City Planetarium', note: 'Open until 9pm', distance: '6 mi' },
  { name: 'Crescent Hill Observatory', note: 'Public nights on Fridays', distance: '18 mi' },
  { name: 'Hidden Valley Dark Sky Park', note: 'Certified dark sky place', distance: '42 mi' },
]



// MAP PREVIEW

function MapPreview() {
  return (
    <>
      <div className="ground" aria-hidden="true">
        <svg className="hills" viewBox="0 0 1440 140" preserveAspectRatio="none">
          <path d="M0 80 C 200 40, 420 60, 640 70 S 1100 30, 1440 60 L 1440 140 L 0 140 Z" fill="var(--far-hills)" />
          <path d="M0 110 C 400 60, 900 70, 1440 100 L 1440 140 L 0 140 Z" fill="var(--snow)" />
        </svg>

        <svg className="tree" viewBox="0 0 60 100">
          <path d="M30 0 L42 22 L36 22 L48 44 L40 44 L54 70 L34 70 L34 84 L26 84 L26 70 L6 70 L20 44 L12 44 L24 22 L18 22 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>

      <section id="map">
        <div className="inner">
          <div>
            <h2>Find dark skies near you</h2>
            <p className="intro"> Dark sky parks, observatories and planetariums all near you!</p>
            <a className="action" href="map">Open the map</a>
          </div>

          <ul className="places">
            {places.map(place => (
              <li key={place.name}>
                <span>
                  {place.name}
                  <small>{place.note}</small>
                </span>
                <span className="distance">{place.distance}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default MapPreview
