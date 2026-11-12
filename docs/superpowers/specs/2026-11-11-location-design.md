# Phase 2: Location — Design

Date: 2026-11-11
Status: Draft for review

## Goal

Let any visitor tell Starling where they are, in a few seconds, without an account. The site remembers the place in their browser, shows it in the header, and makes it available to every page so later phases (Tonight, Calendar, Map) can tailor their content.

Success looks like:

- A visitor sets a location from the header in a few seconds, by current location or by searching a place.
- The header then shows the place ("Kansas City, MO").
- The place is still there after a reload or a later visit.
- Any component can read the place with one hook.

## Decisions

| Question | Decision | Why |
|---|---|---|
| Accounts? | No. The browser remembers the place. The site stays open to everyone. | GitHub Pages has no back-end; sign-ups scare people off; accounts are planned for Phase 7 and can pick up the saved place then. |
| When to ask? | Only when the visitor chooses (the header pill, or a "Set your location" link). | Nothing pops up on arrival; browsers trust permission requests that follow a click. |
| Ways to set it | "Use my current location" and place search. | Covers most people; coordinates entry and recent places are left out for now. |
| Before a place is set | Use a labeled sample place: Kansas City, Missouri. | Pages never look empty. The label itself is built in Phase 3 (see Out of scope). |
| Picker style | A centered window that dims the page. | Chosen in the visual companion. |
| Name for current location | Look it up with OpenStreetMap's Nominatim, after rounding coordinates to about 1 km. | Shows a real town name; OpenStreetMap is already credited. |
| Header after setting | A quiet outlined pill with a yellow pin and the short name. No sparkles. | Bright yellow is saved for "please do this" moments. |
| Sharing the place | React Context plus a `usePlace()` hook. | Built into React, no dependency, one place to change for Phase 7. |

## The place object

```js
{
  name: 'Kansas City',
  region: 'Missouri',
  country: 'US',
  latitude: 39.1,
  longitude: -94.58,
  timeZone: 'America/Chicago',
  source: 'search'
}
```

- `region` may be an empty string when a service gives none.
- `country` is the two-letter country code, uppercase.
- `latitude` and `longitude` are always rounded to two decimal places (about 1 km). Only rounded values are stored or sent anywhere.
- `timeZone` is an IANA time zone name. Search results include it; for current location it comes from the device (`Intl.DateTimeFormat().resolvedOptions().timeZone`).
- `source` is `'search'`, `'device'` or `'sample'`.

**Sample place:** Kansas City, Missouri, US, 39.10, -94.58, America/Chicago, source `'sample'`.

**Names:**

- Short name, for the pill: the place name, a comma, then the US state abbreviation for US places ("Kansas City, MO") or the country code elsewhere ("Paris, FR"). With no region and no country, just the name.
- Long name, for page notes: the place name, a comma, then the full region ("Kansas City, Missouri"), or the name alone when there is no region.

**Storage:**

- Saved in `localStorage` under the key `starling.place` as `{ version: 1, place }`.
- Loading falls back to the sample place when nothing is saved, the JSON is broken, the version doesn't match, required fields are missing, or storage throws (some private windows block it).
- Saving never throws; if storage is blocked, the place still works for the current visit.
- Only one place is kept. Choosing a new one replaces it.

## Files

All location logic lives in a new `src/place/` folder.

| File | Responsibility |
|---|---|
| `src/place/placeStorage.js` | `SAMPLE_PLACE`, `roundCoordinate()`, `loadPlace()`, `savePlace()`. Plain functions, no React. |
| `src/place/placeNames.js` | `shortName(place)`, `longName(place)`, and the US state abbreviation table. |
| `src/place/placeApi.js` | `searchPlaces(query, signal)` (Open-Meteo), `findDevicePlace()` (device position plus OpenStreetMap name lookup), and their error types. |
| `src/place/PlaceContext.jsx` | `PlaceProvider` and `usePlace()`. Holds the place and whether the picker is open, saves every change, and renders `PlaceDialog` once for the whole site. |
| `src/components/PlaceDialog.jsx` and `PlaceDialog.css` | The centered window. |
| `src/components/Header.jsx` and `Header.css` (changed) | The pill opens the picker and switches between the yellow "Set location" style and the quiet named style. |
| `src/main.jsx` (changed) | Wraps the app in `PlaceProvider`, inside the router. |

**What `usePlace()` returns:**

- `place`: the current place object.
- `isSample`: `true` while `place.source` is `'sample'`.
- `setPlace(place)`: rounds, saves and updates.
- `openPicker()` and `closePicker()`.

## Behavior

### The window

- Built with the native `<dialog>` element and `showModal()`, which dims the page, keeps keyboard focus inside, and closes with Escape.
- Title "Where are you stargazing?" and the line "We'll tailor the sky to your spot."
- Focus starts on the "Use my current location" button, or on the search box when that button isn't shown.
- Closes with the × button, Escape, or a click on the dimmed background. Closing without choosing changes nothing.
- Focus returns to whatever opened it.
- On phones it is nearly full width and the results scroll inside it.
- Styled with Starling's palette: dark panel, far-hills border, rounded corners, Fraunces title.

### Use my current location

1. The button reads "Finding you…" and is disabled.
2. `navigator.geolocation.getCurrentPosition` with `enableHighAccuracy: false`, `timeout: 10000` and `maximumAge: 600000`.
3. Round the coordinates, then request `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=…&lon=…&zoom=10&accept-language=en`.
4. The name is the first of the address's `city`, `town`, `village`, `hamlet` or `county`; the region is `state`; the country is `country_code` in uppercase.
5. Save with source `'device'` and the device time zone, then close the window.

| Problem | Result |
|---|---|
| Permission denied | Message under the button: "Location access is blocked. You can search for a place instead." Focus moves to the search box. |
| Position unavailable or over 10 seconds | Message: "We couldn't find you just now. Try again, or search for a place." The button becomes usable again. |
| Name lookup fails | Save anyway with the name "Your location", empty region and country. |
| No geolocation support | The button is not shown. |

The name lookup only ever runs after a click, which keeps Starling well within Nominatim's usage policy.

### Place search

- A labeled `<input type="search">` ("Search for a place") inside a form.
- Searches after the visitor pauses typing for 300 ms with 2 or more characters; Enter searches immediately.
- Requests `https://geocoding-api.open-meteo.com/v1/search?name=…&count=6&language=en&format=json`. Each result's `name`, `admin1`, `country`, `country_code`, `latitude`, `longitude` and `timezone` become a place with source `'search'`.
- Each newer search cancels the previous request (`AbortController`), so stale results never replace newer ones.
- Results are a list of buttons showing the name in bold and "region, country" beneath. Choosing one saves it and closes the window.
- One status line, announced politely to screen readers:
  - "6 places found" (or "1 place found")
  - "No places match 'Kansass'. Check the spelling or try a nearby town."
  - "Search isn't working right now. Check your connection and try again."

### Header pill

- Sample place: the existing yellow "Set location" pill with its sparkles.
- Chosen place: a transparent pill with a far-hills outline, a small yellow pin icon and the short name. No sparkles.
- Either way, clicking it opens the window.

## Testing

Add Vitest as a dev dependency with an `npm test` script. Write each test before its code.

- `placeStorage.js`: a saved place round-trips; missing, broken, wrong-version and incomplete data fall back to the sample; a throwing `localStorage` doesn't crash load or save; coordinates round to two decimals.
- `placeNames.js`: US short names use state abbreviations; other countries use the country code; long names; places with no region.
- `placeApi.js`, with a fake `fetch` and fake geolocation: Open-Meteo results become places; empty results return an empty list; failed requests throw the search error; Nominatim addresses pick the right name field; a failed name lookup still returns "Your location"; geolocation errors map to the blocked and unavailable cases.

Check in the browser: opening and the three ways of closing, focus start and return, a search, current location, each error message, the quiet pill, the place surviving a reload, and phone width. React component tests are left out for now.

## Out of scope

- The "Showing the sky over Kansas City. Set your location to see yours." note on pages. It belongs with real sky data in Phase 3.
- Coordinates entry, recent places, and sharing a location through the web address.
- Accounts and syncing across devices (Phase 7).
- Any real sky, weather or event data.
