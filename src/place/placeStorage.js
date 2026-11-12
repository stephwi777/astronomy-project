// SAMPLE PLACE

export const SAMPLE_PLACE = {
  name: 'Kansas City',
  region: 'Missouri',
  country: 'US',
  latitude: 39.1,
  longitude: -94.58,
  timeZone: 'America/Chicago',
  source: 'sample',
}

const STORAGE_KEY = 'starling.place'
const VERSION = 1
const SOURCES = ['search', 'device', 'sample']



// HELPERS

export function roundCoordinate(value) {
  return Math.round(value * 100) / 100
}

function isPlace(place) {
  return (
    typeof place?.name === 'string' && place.name !== '' &&
    typeof place.region === 'string' &&
    typeof place.country === 'string' &&
    Number.isFinite(place.latitude) &&
    Number.isFinite(place.longitude) &&
    typeof place.timeZone === 'string' && place.timeZone !== '' &&
    SOURCES.includes(place.source)
  )
}



// STORAGE

export function loadPlace(storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY))

    if (saved?.version === VERSION && isPlace(saved.place)) {
      return saved.place
    }
  } catch {
    return SAMPLE_PLACE
  }

  return SAMPLE_PLACE
}

export function savePlace(place, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, place }))
  } catch {
    return
  }
}
