import { afterEach, expect, test, vi } from 'vitest'
import { SearchError, canUseDeviceLocation, findDevicePlace, searchPlaces } from './placeApi.js'



// FAKES

function stubFetch(body, ok = true) {
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok, json: async () => body })))
}

function fakeGeolocation(coords) {
  const geolocation = {
    lastOptions: null,
    getCurrentPosition(success, error, options) {
      geolocation.lastOptions = options
      success({ coords })
    },
  }

  return geolocation
}

function failingGeolocation(code) {
  return {
    getCurrentPosition(success, error) {
      error({ code })
    },
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})



// SEARCH

test('search turns Open-Meteo results into places', async () => {
  stubFetch({ results: [{ name: 'Kansas City', admin1: 'Missouri', country: 'United States', country_code: 'US', latitude: 39.09973, longitude: -94.57857, timezone: 'America/Chicago' }] })
  expect(await searchPlaces('Kansas City')).toEqual([
    { name: 'Kansas City', region: 'Missouri', country: 'US', latitude: 39.1, longitude: -94.58, timeZone: 'America/Chicago', source: 'search' },
  ])
  const url = new URL(fetch.mock.calls[0][0])
  expect(url.origin + url.pathname).toBe('https://geocoding-api.open-meteo.com/v1/search')
  expect(Object.fromEntries(url.searchParams)).toEqual({ name: 'Kansas City', count: '6', language: 'en', format: 'json' })
})

test('search text is URL-encoded', async () => {
  stubFetch({})
  await searchPlaces('Saint-Étienne & co')
  expect(new URL(fetch.mock.calls[0][0]).searchParams.get('name')).toBe('Saint-Étienne & co')
})

test('no results gives an empty list', async () => {
  stubFetch({})
  expect(await searchPlaces('Kansass')).toEqual([])
})

test('missing region and time zone are filled in, missing coordinates are skipped', async () => {
  stubFetch({ results: [
    { name: 'Monaco', country_code: 'MC', latitude: 43.73, longitude: 7.42 },
    { name: 'Nowhere', country_code: 'XX' },
  ] })
  expect(await searchPlaces('Monaco')).toEqual([
    { name: 'Monaco', region: '', country: 'MC', latitude: 43.73, longitude: 7.42, timeZone: 'UTC', source: 'search' },
  ])
})

test('short or blank queries never call the API', async () => {
  stubFetch({})
  expect(await searchPlaces('   ')).toEqual([])
  expect(await searchPlaces(' K ')).toEqual([])
  expect(fetch).not.toHaveBeenCalled()
})

test('a failed search throws SearchError', async () => {
  stubFetch({}, false)
  await expect(searchPlaces('Kansas City')).rejects.toBeInstanceOf(SearchError)
  vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline') }))
  await expect(searchPlaces('Kansas City')).rejects.toBeInstanceOf(SearchError)
})

test('an aborted search passes the AbortError through', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => { throw new DOMException('aborted', 'AbortError') }))
  await expect(searchPlaces('Kansas City')).rejects.toMatchObject({ name: 'AbortError' })
})



// DEVICE LOCATION

test('device location rounds coordinates and names the town', async () => {
  stubFetch({ address: { city: 'Kansas City', state: 'Missouri', country_code: 'us' } })
  const place = await findDevicePlace(fakeGeolocation({ latitude: 39.09973, longitude: -94.57857 }))
  expect(place).toEqual({ name: 'Kansas City', region: 'Missouri', country: 'US', latitude: 39.1, longitude: -94.58, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, source: 'device' })
  const url = new URL(fetch.mock.calls[0][0])
  expect(url.origin + url.pathname).toBe('https://nominatim.openstreetmap.org/reverse')
  expect(Object.fromEntries(url.searchParams)).toEqual({ format: 'jsonv2', lat: '39.1', lon: '-94.58', zoom: '10', 'accept-language': 'en' })
})

test('the name comes from city, town, village, hamlet or county, in that order', async () => {
  stubFetch({ address: { village: 'Parkville', county: 'Platte County', state: 'Missouri', country_code: 'us' } })
  expect((await findDevicePlace(fakeGeolocation({ latitude: 39.19, longitude: -94.68 }))).name).toBe('Parkville')
})

test('a failed or nameless lookup still returns "Your location"', async () => {
  stubFetch({}, false)
  expect(await findDevicePlace(fakeGeolocation({ latitude: 1, longitude: 2 }))).toMatchObject({ name: 'Your location', region: '', country: '', source: 'device' })
  stubFetch({ address: { road: 'Main Street' } })
  expect((await findDevicePlace(fakeGeolocation({ latitude: 1, longitude: 2 }))).name).toBe('Your location')
})

test('geolocation errors become blocked or unavailable', async () => {
  await expect(findDevicePlace(failingGeolocation(1))).rejects.toMatchObject({ reason: 'blocked' })
  await expect(findDevicePlace(failingGeolocation(2))).rejects.toMatchObject({ reason: 'unavailable' })
  await expect(findDevicePlace(failingGeolocation(3))).rejects.toMatchObject({ reason: 'unavailable' })
})

test('geolocation asks for city-level accuracy with a 10 second limit', async () => {
  stubFetch({})
  const geolocation = fakeGeolocation({ latitude: 1, longitude: 2 })
  await findDevicePlace(geolocation)
  expect(geolocation.lastOptions).toEqual({ enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 })
})

test('canUseDeviceLocation is false without geolocation', () => {
  expect(canUseDeviceLocation(undefined)).toBe(false)
  expect(canUseDeviceLocation(fakeGeolocation({ latitude: 1, longitude: 2 }))).toBe(true)
})
