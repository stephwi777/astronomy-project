import { Link } from 'react-router'
import Stars from '../components/Stars.jsx'
import LogoMark from '../components/LogoMark.jsx'
import './About.css'



// FEATURES

const features = [
  { to: '/tonight', name: 'Tonight', text: 'what’s up in your sky, hour by hour.' },
  { to: '/calendar', name: 'Calendar', text: 'meteor showers, eclipses and other sky events coming up.' },
  { to: '/map', name: 'Map', text: 'dark-sky parks, observatories and planetariums near you.' },
  { to: '/learn', name: 'Learn', text: 'the picture of the day, constellations and friendly guides.' },
]



// ABOUT

function About() {
  return (
    <main className="sky">
      <title>About | Starling</title>
      <Stars />

      <section className="about-intro">
        <div className="inner">
          <div>
            <h1>About Starling</h1>
            <p className="lede">A friendly guide to the night sky, made for right where you are.</p>
          </div>

          <div className="about-mark">
            <LogoMark />
          </div>
        </div>
      </section>



      {/* STORY */}

      <section className="about-body">
        <div className="inner">
          <h2>Why a starling?</h2>
          <p>Starlings are speckled with tiny white spots, like a sky full of stars. In winter, thousands of them fly together in swirling clouds called murmurations. That’s how we hope stargazing feels: a little magical, and better together. And of course, there’s a star right in the name!</p>

          <h2>Who it’s for</h2>
          <p>We want to make astronomy accessible to every kind of space fan. Maybe you’re stepping outside to find your first planet, packing the car for a meteor shower, or chasing the northern lights. Beginners get clear, simple places to start, with no telescope or know-how needed. Seasoned stargazers can dig into all the details. Just look up!</p>

          <h2>What you’ll find</h2>
          <ul className="features">
            {features.map(feature => (
              <li key={feature.to}>
                <Link to={feature.to}>{feature.name}</Link>: {feature.text}
              </li>
            ))}
          </ul>

          <h2>Who makes Starling</h2>
          <p>Starling is an independent project by Stephanie Wilson, made with a love of birds and the night sky. It’s still growing, so check back for new features.</p>
          <p>Have an idea or spotted a mistake? <Link to="/contact">Get in touch</Link>. Curious where our data comes from? <Link to="/credits">See our sources</Link>.</p>
        </div>
      </section>
    </main>
  )
}

export default About
