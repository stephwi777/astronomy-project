import { useState } from 'react'
import { PlaceContext } from './usePlace.js'
import { loadPlace, roundCoordinate, savePlace } from './placeStorage.js'
import PlaceDialog from '../components/PlaceDialog.jsx'



// PROVIDER

export function PlaceProvider({ children }) {
  const [place, setPlaceState] = useState(() => loadPlace())
  const [pickerOpen, setPickerOpen] = useState(false)

  function setPlace(newPlace) {
    const rounded = {
      ...newPlace,
      latitude: roundCoordinate(newPlace.latitude),
      longitude: roundCoordinate(newPlace.longitude),
    }

    savePlace(rounded)
    setPlaceState(rounded)
  }

  const value = {
    place,
    isSample: place.source === 'sample',
    setPlace,
    pickerOpen,
    openPicker: () => setPickerOpen(true),
    closePicker: () => setPickerOpen(false),
  }

  return (
    <PlaceContext value={value}>
      {children}
      <PlaceDialog />
    </PlaceContext>
  )
}
