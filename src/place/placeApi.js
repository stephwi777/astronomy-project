import { roundCoordinate } from './placeStorage.js'



// SETTINGS

const SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse'

const POSITION_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 600000,
}



// ERRORS

export class SearchError extends Error {
  constructor() {
    super('Place search failed')
    this.name = 'SearchError'
  }
}

export class LocationError extends Error {
  constructor(reason) {
    super(`Device location ${reason}`)
    this.name = 'LocationError'
    this.reason = reason
  }
}



// SEARCH

export async function searchPlaces(query, signal) {
  const text = query.trim()

  if (text.length < 2) return []

  const url = new URL(SEARCH_URL)
  url.search = new URLSearchParams({ name: text, count: '6', language: 'en', format: 'json' })

  let data

  try {
    const response = await fetch(url, { signal })
    if (!response.ok) throw new SearchError()
    data = await response.json()
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new SearchError()
  }

  return (data.results ?? [])
    .filter(result => Number.isFinite(result.latitude) && Number.isFinite(result.longitude))
    .map(result => ({
      name: result.name,
      region: result.admin1 ?? '',
      country: (result.country_code ?? '').toUpperCase(),
      latitude: roundCoordinate(result.latitude),
      longitude: roundCoordinate(result.longitude),
      timeZone: result.timezone ?? 'UTC',
      source: 'search',
    }))
}



// DEVICE LOCATION

export function canUseDeviceLocation(geolocation = globalThis.navigator?.geolocation) {
  return Boolean(geolocation)
}

function getPosition(geolocation) {
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(new LocationError(error.code === 1 ? 'blocked' : 'unavailable')),
      POSITION_OPTIONS,
    )
  })
}

async function lookupAddress(latitude, longitude) {
  const url = new URL(REVERSE_URL)
  url.search = new URLSearchParams({ format: 'jsonv2', lat: latitude, lon: longitude, zoom: '10', 'accept-language': 'en' })

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) return {}
    const data = await response.json()
    return data.address ?? {}
  } catch {
    return {}
  }
}

export async function findDevicePlace(geolocation = globalThis.navigator?.geolocation) {
  if (!geolocation) throw new LocationError('unavailable')

  const coords = await getPosition(geolocation)
  const latitude = roundCoordinate(coords.latitude)
  const longitude = roundCoordinate(coords.longitude)
  const address = await lookupAddress(latitude, longitude)
  const town = address.city ?? address.town ?? address.village ?? address.hamlet ?? address.county

  return {
    name: town ?? 'Your location',
    region: town ? address.state ?? '' : '',
    country: town ? (address.country_code ?? '').toUpperCase() : '',
    latitude,
    longitude,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    source: 'device',
  }
}
