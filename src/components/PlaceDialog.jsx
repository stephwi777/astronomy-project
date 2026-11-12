import { useEffect, useRef, useState } from 'react'
import { usePlace } from '../place/usePlace.js'
import { LocationError, canUseDeviceLocation, findDevicePlace, searchPlaces } from '../place/placeApi.js'
import './PlaceDialog.css'



// MESSAGES

const deviceMessages = {
  blocked: 'Location access is blocked. You can search for a place instead.',
  unavailable: 'We couldn’t find you just now. Try again, or search for a place.',
}

const searchFailed = 'Search isn’t working right now. Check your connection and try again.'

function foundMessage(count, text) {
  if (count === 0) return `No places match ‘${text}’. Check the spelling or try a nearby town.`
  return count === 1 ? '1 place found' : `${count} places found`
}



// PLACE DIALOG

function PlaceDialog() {
  const { setPlace, pickerOpen, closePicker } = usePlace()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('')
  const [finding, setFinding] = useState(false)
  const [deviceMessage, setDeviceMessage] = useState('')
  const dialogRef = useRef(null)
  const deviceRef = useRef(null)
  const searchRef = useRef(null)
  const controllerRef = useRef(null)
  const visitRef = useRef(0)
  const deviceAvailable = canUseDeviceLocation()

  useEffect(() => {
    const dialog = dialogRef.current

    if (pickerOpen && !dialog.open) {
      dialog.showModal()
      ;(deviceRef.current ?? searchRef.current).focus()
    }

    if (!pickerOpen && dialog.open) dialog.close()
  }, [pickerOpen])

  async function runSearch(text) {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const places = await searchPlaces(text, controller.signal)
      if (controller.signal.aborted) return
      setResults(places)
      setStatus(foundMessage(places.length, text))
    } catch (error) {
      if (error.name === 'AbortError') return
      setResults([])
      setStatus(searchFailed)
    }
  }

  useEffect(() => {
    const text = query.trim()

    if (text.length < 2) return

    const timer = setTimeout(() => runSearch(text), 300)

    return () => clearTimeout(timer)
  }, [query])

  function handleQueryChange(event) {
    setQuery(event.target.value)

    if (event.target.value.trim().length < 2) {
      controllerRef.current?.abort()
      setResults([])
      setStatus('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const text = query.trim()
    if (text.length >= 2) runSearch(text)
  }

  async function handleDeviceLocation() {
    const visit = visitRef.current
    setFinding(true)
    setDeviceMessage('')

    try {
      const place = await findDevicePlace()
      if (visit === visitRef.current) choose(place)
    } catch (error) {
      if (visit !== visitRef.current) return
      const reason = error instanceof LocationError ? error.reason : 'unavailable'
      setFinding(false)
      setDeviceMessage(deviceMessages[reason])
      if (reason === 'blocked') searchRef.current.focus()
    }
  }

  function choose(place) {
    setPlace(place)
    dialogRef.current.close()
  }

  function handleClose() {
    visitRef.current += 1
    controllerRef.current?.abort()
    setQuery('')
    setResults([])
    setStatus('')
    setFinding(false)
    setDeviceMessage('')
    closePicker()
  }

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="place-dialog"
      aria-labelledby="place-dialog-title"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      <div>
        <button className="place-close" type="button" aria-label="Close" onClick={() => dialogRef.current.close()}>
          ×
        </button>

        <h2 id="place-dialog-title">Where are you stargazing?</h2>
        <p>We’ll tailor the sky to your spot.</p>



        {/* CURRENT LOCATION */}

        {deviceAvailable && (
          <>
            <button
              ref={deviceRef}
              className="place-use"
              type="button"
              disabled={finding}
              onClick={handleDeviceLocation}
            >
              {finding ? 'Finding you…' : 'Use my current location'}
            </button>
            <p aria-live="polite">{deviceMessage}</p>
          </>
        )}



        {/* SEARCH */}

        <form role="search" onSubmit={handleSubmit}>
          <label htmlFor="place-search">Search for a place</label>
          <input
            ref={searchRef}
            id="place-search"
            type="search"
            autoComplete="off"
            value={query}
            onChange={handleQueryChange}
          />
        </form>

        <p aria-live="polite">{status}</p>

        {results.length > 0 && (
          <ul>
            {results.map(place => (
              <li key={`${place.name} ${place.latitude} ${place.longitude}`}>
                <button type="button" onClick={() => choose(place)}>
                  <strong>{place.name}</strong>
                  <span>{[place.region, place.country].filter(Boolean).join(', ')}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  )
}

export default PlaceDialog
