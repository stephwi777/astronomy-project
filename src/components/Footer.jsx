import MotionToggle from './MotionToggle.jsx'
import './Footer.css'



// LINKS

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Tonight', href: 'tonight' },
      { label: 'Calendar', href: 'calendar' },
      { label: 'Map', href: 'map' },
      { label: 'Learn', href: 'learn' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Starling', href: 'about' },
      { label: 'Where our sky data comes from', href: 'credits' },
      { label: 'Contact', href: 'contact' },
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
            <a className="footer-logo" href="#">Starling</a>
            <p>A friendly guide to the night sky, right where you are.</p>
          </div>

          {columns.map(column => (
            <div key={column.title} className="footer-column">
              <h2>{column.title}</h2>
              <ul>
                {column.links.map(link => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
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
