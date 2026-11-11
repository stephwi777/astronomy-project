import Stars from '../components/Stars.jsx'
import DoorLink from '../components/DoorLink.jsx'
import './Placeholder.css'



// PLACEHOLDER

function Placeholder({ title, text = 'This page is still being built. Check back soon.' }) {
  return (
    <main className="sky">
      <Stars />

      <section className="placeholder">
        <div className="inner">
          <h1>{title}</h1>
          <p className="intro">{text}</p>
          <DoorLink to="/">Back to the main page</DoorLink>
        </div>
      </section>
    </main>
  )
}

export default Placeholder
