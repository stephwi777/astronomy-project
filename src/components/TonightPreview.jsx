import './TonightPreview.css'



// ROWS

const rows = [
  { name: 'Darkness', note: 'Fully dark 6:31pm to 5:52am', from: 0.157, to: 0.867, color: '#6e64c4' },
  { name: 'Moon', note: 'Up until 7:42pm', from: 0, to: 0.231, color: 'var(--moon)' },
  { name: 'Saturn', note: 'Dusk until 1:10am', from: 0.094, to: 0.573, color: 'var(--snow)' },
]



// TONIGHT PREVIEW

function TonightPreview() {
  return (
    <>
      <svg className="edge" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 C 360 10, 1080 10, 1440 60 L 1440 90 L 0 90 Z" fill="var(--high)" />
      </svg>

      <section id="when">
        <svg className="aurora" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 120 C 240 40, 480 150, 760 80 S 1200 30, 1440 90 L 1440 130 C 1200 70, 1000 150, 760 120 S 260 90, 0 160 Z" fill="var(--teal)" opacity="0.16" />
        </svg>

        <div className="inner">
          <div>
            <h2>Know when to look</h2>
            <p className="intro">See tonight hour by hour: when it gets dark, when the Moon sets, which planets are up, and when clouds or auroras roll in.</p>
            <a className="action" href="tonight">Open tonight's timeline</a>
          </div>

          <ul className="preview">
            {rows.map(row => (
              <li key={row.name}>
                <p>
                  <strong>{row.name}</strong>
                  {row.note}
                </p>
                <div className="track" aria-hidden="true">
                  <span style={{ left: `${row.from * 100}%`, right: `${(1 - row.to) * 100}%`, background: row.color }}></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default TonightPreview
