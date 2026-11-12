import { Routes, Route } from 'react-router'
import ScrollToTop from './components/ScrollToTop.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Placeholder from './pages/Placeholder.jsx'
import Contact from './pages/Contact.jsx'
import Credits from './pages/Credits.jsx'
import About from './pages/About.jsx'
import './App.css'



// APP

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />



      {/* PAGES */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tonight" element={<Placeholder title="Tonight's sky" />} />
        <Route path="calendar" element={<Placeholder title="Calendar" />} />
        <Route path="map" element={<Placeholder title="Map" />} />
        <Route path="learn" element={<Placeholder title="Learn" />} />
        <Route path="about" element={<About />} />
        <Route path="credits" element={<Credits />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Placeholder title="Lost in space" text="We couldn't find that page." />} />
      </Routes>



      {/* FOOTER */}

      <Footer />
    </>
  )
}

export default App
