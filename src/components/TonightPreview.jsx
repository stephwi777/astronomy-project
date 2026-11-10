import useInView from '../hooks/useInView.js'
import Aurora from './Aurora.jsx'
import Twinkle from './Twinkle.jsx'
import DoorLink from './DoorLink.jsx'
import './TonightPreview.css'



// ROWS

const rows = [
  { name: 'Darkness', note: 'Fully dark 6:31pm to 5:52am', from: 0.157, to: 0.867, color: '#6e64c4' },
  { name: 'Moon', note: 'Up until 7:42pm', from: 0, to: 0.231, color: 'var(--moon)' },
  { name: 'Saturn', note: 'Dusk until 1:10am', from: 0.094, to: 0.573, color: 'var(--snow)' },
]

const now = { label: '9:15pm', at: 0.328 }



// TONIGHT PREVIEW

function TonightPreview() {
  const [ref, inView] = useInView()

  return (
    <>
      <svg className="edge" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 C 360 10, 1080 10, 1440 60 L 1440 100 L 0 100 Z" fill="var(--high)" />
      </svg>

      <section id="when">
        <Aurora />

        <div className="inner">
          <div>
            <h2>Know when to look</h2>
            <p className="intro">See tonight hour by hour: when it gets dark, when the Moon sets, which planets are up, and when clouds or auroras roll in.</p>
          </div>

          <div ref={ref} className={inView ? 'preview door shown' : 'preview door'}>
            <ul>
              {rows.map((row, i) => (
                <li key={row.name}>
                  <p>
                    <strong>{row.name}</strong>
                    {row.note}
                  </p>
                  <div className="track" aria-hidden="true">
                    <span
                      className="range"
                      style={{ left: `${row.from * 100}%`, right: `${(1 - row.to) * 100}%`, background: row.color, '--i': i }}
                    ></span>
                    <span className="now" style={{ left: `${now.at * 100}%` }}></span>
                    <Twinkle at={row.to} delay={`${0.8 + i * 0.2}s`} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="panel-foot">
              <p className="now-label"><span></span>Now, {now.label}</p>
              <DoorLink href="tonight">Open tonight's timeline</DoorLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TonightPreview
