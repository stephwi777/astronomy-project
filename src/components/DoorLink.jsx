import './DoorLink.css'



// DOOR LINK

function DoorLink({ href, children }) {
  return (
    <a className="door-link" href={href}>
      <svg viewBox="0 0 14 14" aria-hidden="true">
        <path d="M7 0 Q8 6 14 7 Q8 8 7 14 Q6 8 0 7 Q6 6 7 0 Z" />
      </svg>
      {children}
    </a>
  )
}

export default DoorLink
