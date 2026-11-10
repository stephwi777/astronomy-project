import { useEffect, useState } from 'react'
import './MotionToggle.css'



// SAVED CHOICE

function savedChoice() {
  try {
    return localStorage.getItem('starling-still') === 'yes'
  } catch {
    return false
  }
}

function saveChoice(still) {
  try {
    localStorage.setItem('starling-still', still ? 'yes' : 'no')
  } catch {
    return false
  }
  return true
}



// MOTION TOGGLE

function MotionToggle() {
  const [still, setStill] = useState(savedChoice)

  useEffect(() => {
    document.documentElement.classList.toggle('still', still)
    saveChoice(still)
  }, [still])

  return (
    <button className="motion" onClick={() => setStill(!still)}>
      {still ? 'Play animations' : 'Pause animations'}
    </button>
  )
}

export default MotionToggle
