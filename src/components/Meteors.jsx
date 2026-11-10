import { useEffect, useState } from 'react'
import './Meteors.css'



// COLORS

const palettes = [
  { head: 'var(--teal)', tail: '#8f86d6' },
  { head: 'var(--beak)', tail: 'var(--bronze)' },
  { head: 'var(--snow)', tail: 'var(--teal)' },
  { head: 'var(--moon)', tail: 'var(--snow)' },
]

const sparks = [
  { x: 22, y: -14 },
  { x: 28, y: 7 },
  { x: 11, y: 21 },
  { x: -3, y: -21 },
  { x: 34, y: -4 },
]

const glitter = [0.15, 0.3, 0.45, 0.6, 0.75]



// METEOR

function makeMeteor(id) {
  const comet = Math.random() < 0.15

  return {
    id,
    comet,
    burst: !comet && Math.random() < 0.4,
    top: Math.random() * 45,
    left: 25 + Math.random() * 70,
    ...palettes[Math.floor(Math.random() * palettes.length)],
  }
}



// METEORS

function Meteors() {
  const [meteor, setMeteor] = useState(null)

  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let count = 0
    let timer

    const schedule = () => {
      const wait = count === 0 ? 6000 + Math.random() * 6000 : 20000 + Math.random() * 20000

      timer = setTimeout(() => {
        if (!calm.matches && !document.hidden) {
          count += 1
          setMeteor(makeMeteor(count))
        }
        schedule()
      }, wait)
    }

    schedule()

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="meteors" aria-hidden="true">
      {meteor && (
        <span
          key={meteor.id}
          className={meteor.comet ? 'meteor comet' : 'meteor'}
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            '--head': meteor.head,
            '--tail': meteor.tail,
          }}
        >
          <span className="flight">
            <span className="tail"></span>
            <span className="head"></span>
          </span>

          {meteor.burst && sparks.map((spark, i) => (
            <span key={i} className="spark" style={{ '--x': `${spark.x}px`, '--y': `${spark.y}px` }}></span>
          ))}

          {meteor.comet && glitter.map(when => (
            <span key={when} className="glitter" style={{ '--when': when }}></span>
          ))}
        </span>
      )}
    </div>
  )
}

export default Meteors
