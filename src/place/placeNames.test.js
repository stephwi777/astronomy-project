import { expect, test } from 'vitest'
import { longName, shortName } from './placeNames.js'



// TESTS

test('US places use the state abbreviation', () => {
  expect(shortName({ name: 'Kansas City', region: 'Missouri', country: 'US' })).toBe('Kansas City, MO')
  expect(shortName({ name: 'Washington', region: 'District of Columbia', country: 'US' })).toBe('Washington, DC')
})

test('a US region missing from the table falls back to the country code', () => {
  expect(shortName({ name: 'Hagåtña', region: 'Guam', country: 'US' })).toBe('Hagåtña, US')
})

test('other countries use the country code', () => {
  expect(shortName({ name: 'Paris', region: 'Île-de-France', country: 'FR' })).toBe('Paris, FR')
})

test('a place with no region or country is just its name', () => {
  expect(shortName({ name: 'Your location', region: '', country: '' })).toBe('Your location')
  expect(longName({ name: 'Your location', region: '', country: '' })).toBe('Your location')
})

test('long names use the full region', () => {
  expect(longName({ name: 'Kansas City', region: 'Missouri', country: 'US' })).toBe('Kansas City, Missouri')
})

test('accents and non-Latin letters are kept', () => {
  expect(shortName({ name: 'São Paulo', region: 'São Paulo', country: 'BR' })).toBe('São Paulo, BR')
  expect(longName({ name: 'Zürich', region: 'Zürich', country: 'CH' })).toBe('Zürich, Zürich')
  expect(shortName({ name: '東京', region: '東京都', country: 'JP' })).toBe('東京, JP')
})
