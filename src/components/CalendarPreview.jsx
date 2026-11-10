import './CalendarPreview.css'



// EVENTS

const events = [
  { date: '2026-11-17', label: 'Nov 17', name: 'Leonid meteor shower', note: 'Up to 15 meteors an hour before dawn.' },
  { date: '2026-11-24', label: 'Nov 24', name: 'Full moon', note: 'The Beaver Moon rises at sunset.' },
  { date: '2026-11-28', label: 'Nov 28', name: 'Moon meets Jupiter', note: 'A close pair low in the east.' },
]



// CALENDAR PREVIEW

function CalendarPreview() {
  return (
    <div className="horizon">
      <svg className="edge" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 C 300 30, 700 80, 1000 40 S 1300 50, 1440 30 L 1440 90 L 0 90 Z" fill="var(--horizon)" />
      </svg>

      <section id="calendar">
        <div className="inner">
          <h2>Never miss a meteor shower</h2>
          <p className="intro">Eclipses, full moons, meteor showers and planets meeting up, all in one calendar.</p>

          <ol className="events">
            {events.map(event => (
              <li key={event.date}>
                <time dateTime={event.date}>{event.label}</time>
                <p>
                  <strong>{event.name}</strong>
                  {event.note}
                </p>
              </li>
            ))}
          </ol>

          <a className="action" href="calendar">See the full calendar</a>
        </div>
      </section>
    </div>
  )
}

export default CalendarPreview
