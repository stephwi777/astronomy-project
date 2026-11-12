import { createContext, useContext } from 'react'



// CONTEXT

export const PlaceContext = createContext(null)



// HOOK

export function usePlace() {
  const value = useContext(PlaceContext)

  if (!value) throw new Error('usePlace must be used inside PlaceProvider')

  return value
}
