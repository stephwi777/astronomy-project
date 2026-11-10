import { useState } from 'react'
import useInView from '../hooks/useInView.js'
import DoorLink from './DoorLink.jsx'
import './LearnPreview.css'



// STARS OF CASSIOPEIA

const cassiopeia = [
  { name: 'Caph', x: 20, y: 40, r: 6 },
  { name: 'Schedar', x: 90, y: 100, r: 7 },
  { name: 'Navi', x: 150, y: 50, r: 6 },
  { name: 'Ruchbah', x: 210, y: 105, r: 5 },
  { name: 'Segin', x: 280, y: 30, r: 6 },
]



// LEARN PREVIEW

function LearnPreview() {
  const [ref, inView] = useInView()
  const [picked, setPicked] = useState(null)

  return (
    <section id="learn">
      <div className="inner">
        <div ref={ref} className={inView ? 'constellation shown' : 'constellation'}>
          <svg viewBox="0 0 300 140" aria-hidden="true">
            <polyline
              points={cassiopeia.map(star => `${star.x},${star.y}`).join(' ')}
              pathLength="1"
              fill="none"
              stroke="var(--snow-shade)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {cassiopeia.map((star, i) => (
              <g
                key={star.name}
                className={picked === star.name ? 'node picked' : 'node'}
                style={{ '--i': i }}
                onClick={() => setPicked(picked === star.name ? null : star.name)}
              >
                <circle className="ring" cx={star.x} cy={star.y} r={star.r} />
                <circle className="dot" cx={star.x} cy={star.y} r={star.r} />
                <circle className="hit" cx={star.x} cy={star.y} r="18" />
                <text x={star.x} y={star.y > 80 ? star.y + 26 : star.y - 16}>{star.name}</text>
              </g>
            ))}
          </svg>
          <p>This month: find Cassiopeia's W high in the north.</p>
        </div>

        <div>
          <h2>Learn more</h2>
          <p className="intro">Discover a new constellation each month. Check out NASA's picture of the day and friendly guides for your first nights out.</p>
          <DoorLink href="learn">Start learning</DoorLink>
        </div>
      </div>
    </section>
  )
}

export default LearnPreview
