import { Link } from 'react-router'
import './Hero.css'



// HERO

function Hero() {
  return (
    <section id="hero">
      <div className="inner">
        <div>
          <h1>Meet tonight's sky</h1>
          <p className="lede">Starling shows you what’s up there, right where you are. Just look up, no telescope needed.</p>

          <div className="actions">
            <Link className="action" to="/tonight">See tonight's sky</Link>
            <a className="more" href="#when">How Starling helps</a>
          </div>
        </div>

        <figure>
          <svg className="moon" viewBox="0 0 340 340" aria-hidden="true">
            <defs>
              <radialGradient id="moon-glow">
                <stop offset="40%" stopColor="#f6ead0" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#f6ead0" stopOpacity="0" />
              </radialGradient>
              <mask id="crescent">
                <circle cx="170" cy="170" r="96" fill="white" />
                <circle cx="148" cy="164" r="94" fill="black" />
              </mask>
            </defs>
            <circle cx="170" cy="170" r="170" fill="url(#moon-glow)" />
            <circle cx="170" cy="170" r="96" fill="#1c2050" />
            <circle cx="170" cy="170" r="96" fill="var(--moon)" mask="url(#crescent)" />
          </svg>

          <figcaption>Tonight: a thin crescent moon that sets at 7:42pm</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default Hero
