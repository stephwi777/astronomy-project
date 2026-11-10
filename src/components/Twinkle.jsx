import './Twinkle.css'



// TWINKLE

function Twinkle({ at, delay }) {
  return (
    <svg className="twinkle" viewBox="0 0 14 14" aria-hidden="true" style={{ left: `${at * 100}%`, '--delay': delay }}>
      <path d="M7 0 Q8 6 14 7 Q8 8 7 14 Q6 8 0 7 Q6 6 7 0 Z" />
    </svg>
  )
}

export default Twinkle
