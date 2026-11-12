import { useState } from 'react'
import Stars from '../components/Stars.jsx'
import './Contact.css'



// CONTACT DETAILS
//email and form are placeholders for now

const EMAIL = 'hello@example.com'
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const errors = {
  name: 'Please enter your name.',
  email: 'Please enter an email address like name@example.com.',
  topic: 'Please choose a topic.',
  message: 'Please write a message.',
}



// CONTACT

function Contact() {
  const [invalid, setInvalid] = useState({})
  const [announcement, setAnnouncement] = useState('')
  const [status, setStatus] = useState('idle')

  function check(field, announce) {
    const isInvalid = field.matches(':user-invalid')

    setInvalid(current => ({ ...current, [field.name]: isInvalid }))

    if (announce && isInvalid) {
      setAnnouncement('')
      setTimeout(() => setAnnouncement(`${field.labels[0].textContent}: ${errors[field.name]}`), 500)
    }
  }

  const fieldEvents = {
    onBlur: event => check(event.target, true),
    onInput: event => invalid[event.target.name] && check(event.target, false),
    onInvalid: event => check(event.target, false),
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      setTimeout(() => form.querySelector(':invalid').focus())
      return
    }

    setStatus('sending')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Message not sent')

      form.reset()
      setInvalid({})
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      <title>Contact | Starling</title>
      <div className="sky">
        <Stars />

        <section className="contact-intro">
          <div className="inner">
            <h1>Get in touch</h1>
            <p className="intro">Have any ideas and suggestions, or want to work together? We'd love to hear from you!</p>
          </div>
        </section>
      </div>

      <svg className="contact-hills" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 C 240 20, 520 40, 760 52 S 1180 18, 1440 44 L 1440 130 L 0 130 Z" fill="var(--far-hills)" />
        <path d="M0 96 C 380 52, 980 60, 1440 88 L 1440 130 L 0 130 Z" fill="var(--snow)" />
      </svg>



      {/* FORM */}

      <div className="snowfield">
        <section className="contact-body">
          <div className="inner">
            <div>
              <h2 id="form-title">Send us a message</h2>
              <p className="form-note">All fields are required.</p>

              <form className="contact-form" aria-labelledby="form-title" noValidate onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength="100"
                    required
                    aria-invalid={invalid.name ?? false}
                    aria-describedby={invalid.name ? 'name-error' : undefined}
                    {...fieldEvents}
                  />
                  <p id="name-error" className="error"><span className="error-icon" role="img" aria-label="Error">!</span>{errors.name}</p>
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    required
                    aria-invalid={invalid.email ?? false}
                    aria-describedby={invalid.email ? 'email-error' : undefined}
                    {...fieldEvents}
                  />
                  <p id="email-error" className="error"><span className="error-icon" role="img" aria-label="Error">!</span>{errors.email}</p>
                </div>

                <div className="field">
                  <label htmlFor="topic">Topic</label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    aria-invalid={invalid.topic ?? false}
                    aria-describedby={invalid.topic ? 'topic-error' : undefined}
                    onChange={event => check(event.target, true)}
                    {...fieldEvents}
                  >
                    <option value="">Choose a topic</option>
                    <option>Data correction</option>
                    <option>Suggestion or feedback</option>
                    <option>Press or partnership</option>
                    <option>Something else</option>
                  </select>
                  <p id="topic-error" className="error"><span className="error-icon" role="img" aria-label="Error">!</span>{errors.topic}</p>
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    maxLength="5000"
                    required
                    aria-invalid={invalid.message ?? false}
                    aria-describedby={invalid.message ? 'message-error' : undefined}
                    {...fieldEvents}
                  />
                  <p id="message-error" className="error"><span className="error-icon" role="img" aria-label="Error">!</span>{errors.message}</p>
                </div>

                <input className="visually-hidden" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />

                <div className="form-actions">
                  <button className="action" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  <p className="form-status" role="status">
                    {status === 'sent' && "Thanks! Your message is on its way. We'll reply within a few days."}
                    {status === 'error' && <>Sorry, your message didn't send. Please try again, or email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>}
                  </p>
                </div>
              </form>

              <p className="visually-hidden" aria-live="polite">{announcement}</p>
            </div>



            {/* DETAILS */}

            <aside className="contact-details" aria-label="Other ways to reach us">
              <h2>Email us</h2>
              <p>Prefer your own inbox? Write to us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>

              <h2>What to expect</h2>
              <p>We read every message and usually reply within a few days.</p>

              <h2>Helpful details</h2>
              <ul>
                <li><strong>Data corrections:</strong> the event or place, what looks wrong, and a source if you have one.</li>
                <li><strong>Suggestions:</strong> features you'd love to see, or a dark-sky spot we should add to the map.</li>
                <li><strong>Press and partnerships:</strong> astronomy clubs, observatories, planetariums and writers are all welcome.</li>
              </ul>

              <p className="privacy">We only use your details to reply to you, and we never share them.</p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Contact
