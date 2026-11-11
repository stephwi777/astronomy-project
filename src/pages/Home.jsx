import Stars from '../components/Stars.jsx'
import Meteors from '../components/Meteors.jsx'
import Hero from '../components/Hero.jsx'
import TonightPreview from '../components/TonightPreview.jsx'
import CalendarPreview from '../components/CalendarPreview.jsx'
import MapPreview from '../components/MapPreview.jsx'
import LearnPreview from '../components/LearnPreview.jsx'



// HOME

function Home() {
  return (
    <main>
      <div className="sky">
        <Stars />
        <Meteors />
        <Hero />
        <TonightPreview />
      </div>

      <CalendarPreview />

      <div className="snowfield">
        <MapPreview />
        <LearnPreview />
      </div>
    </main>
  )
}

export default Home
