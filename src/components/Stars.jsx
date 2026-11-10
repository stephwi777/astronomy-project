import './Stars.css'



// STARS

const tints = ['var(--frost)', 'var(--frost)', 'var(--frost)', 'var(--snow)', 'var(--bronze)', 'var(--teal)']

const stars = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  top: Math.pow(Math.random(), 1.5) * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 1,
  color: tints[Math.floor(Math.random() * tints.length)],
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 6,
}))

const sparkles = [
  { left: 8, top: 22 },
  { left: 46, top: 6 },
  { left: 62, top: 38 },
  { left: 90, top: 14 },
]



// FIELD

function Stars() {
  return (
    <div className="stars" aria-hidden="true">
      {stars.map(star => (
        <span
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {sparkles.map((sparkle, i) => (
        <svg
          key={i}
          className="sparkle"
          viewBox="0 0 14 14"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${i * 1.7}s`,
          }}
        >
          <path d="M7 0 Q8 6 14 7 Q8 8 7 14 Q6 8 0 7 Q6 6 7 0 Z" fill="var(--moon)" />
        </svg>
      ))}
    </div>
  )
}

export default Stars
