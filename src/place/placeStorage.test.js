import { expect, test } from 'vitest'
import { SAMPLE_PLACE, loadPlace, roundCoordinate, savePlace } from './placeStorage.js'



// FAKE STORAGE

function fakeStorage() {
  const items = new Map()

  return {
    getItem: key => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
  }
}

function throwingStorage() {
  return {
    getItem: () => { throw new Error('blocked') },
    setItem: () => { throw new Error('blocked') },
  }
}



// TESTS

test('roundCoordinate keeps two decimals', () => {
  expect(roundCoordinate(39.09972)).toBe(39.1)
  expect(roundCoordinate(-94.57857)).toBe(-94.58)
})

test('a saved place loads back exactly', () => {
  const storage = fakeStorage()
  const place = { name: 'Paris', region: 'Île-de-France', country: 'FR', latitude: 48.85, longitude: 2.35, timeZone: 'Europe/Paris', source: 'search' }
  savePlace(place, storage)
  expect(JSON.parse(storage.getItem('starling.place'))).toEqual({ version: 1, place })
  expect(loadPlace(storage)).toEqual(place)
})

test('nothing saved falls back to the sample', () => {
  expect(loadPlace(fakeStorage())).toEqual(SAMPLE_PLACE)
})

test('broken JSON falls back to the sample', () => {
  const storage = fakeStorage()
  storage.setItem('starling.place', '{not json')
  expect(loadPlace(storage)).toEqual(SAMPLE_PLACE)
})

test('a different version falls back to the sample', () => {
  const storage = fakeStorage()
  storage.setItem('starling.place', JSON.stringify({ version: 2, place: SAMPLE_PLACE }))
  expect(loadPlace(storage)).toEqual(SAMPLE_PLACE)
})

test('a place with missing or wrong-typed fields falls back to the sample', () => {
  const storage = fakeStorage()
  storage.setItem('starling.place', JSON.stringify({ version: 1, place: { ...SAMPLE_PLACE, name: 'Lyon', latitude: '45.76' } }))
  expect(loadPlace(storage)).toEqual(SAMPLE_PLACE)
})

test('blocked storage never throws', () => {
  const storage = throwingStorage()
  expect(loadPlace(storage)).toEqual(SAMPLE_PLACE)
  expect(() => savePlace(SAMPLE_PLACE, storage)).not.toThrow()
})

test('a browser that blocks storage completely still gets the sample', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('SecurityError') } })

  try {
    expect(loadPlace()).toEqual(SAMPLE_PLACE)
    expect(() => savePlace(SAMPLE_PLACE)).not.toThrow()
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original)
    else delete globalThis.localStorage
  }
})
