import { Link } from 'react-router'
import './DoorLink.css'



// DOOR LINK

function DoorLink({ to, children }) {
  return (
    <Link className="door-link" to={to}>
      <svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M7 0 Q8 6 14 7 Q8 8 7 14 Q6 8 0 7 Q6 6 7 0 Z" />
      </svg>
      {children}
    </Link>
  )
}

export default DoorLink
