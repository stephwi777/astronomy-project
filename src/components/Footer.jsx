import { Link } from 'react-router'
import MotionToggle from './MotionToggle.jsx'
import './Footer.css'



// LINKS

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Tonight', to: '/tonight' },
      { label: 'Calendar', to: '/calendar' },
      { label: 'Map', to: '/map' },
      { label: 'Learn', to: '/learn' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Starling', to: '/about' },
      { label: 'Where our sky data comes from', to: '/credits' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]



// FOOTER

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="footer-logo" to="/">Starling</Link>
            <p>A friendly guide to the night sky, right where you are.</p>
          </div>

          {columns.map(column => (
            <div key={column.title} className="footer-column">
              <h2>{column.title}</h2>
              <ul>
                {column.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-base">
          <p>© 2026 Stephanie Wilson. All rights reserved.</p>
          <MotionToggle />
          {/* TO DO */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
