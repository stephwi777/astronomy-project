import Stars from './components/Stars.jsx'
import Meteors from './components/Meteors.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TonightPreview from './components/TonightPreview.jsx'
import CalendarPreview from './components/CalendarPreview.jsx'
import MapPreview from './components/MapPreview.jsx'
import LearnPreview from './components/LearnPreview.jsx'
import Footer from './components/Footer.jsx'
import './App.css'



// APP

function App() {
  return (
    <>
      <Header />



      {/* MAIN CONTENT */}

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



      {/* FOOTER */}

      <Footer />
    </>
  )
}

export default App
