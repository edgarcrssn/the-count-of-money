import { JwtPayload } from '@the-count-of-money/types'
import { createContext } from 'react'

interface CurrentUserContextType {
  readonly currentUser: JwtPayload | null
  readonly setCurrentUser: (currentUser: JwtPayload | null) => void
  readonly loadCurrentUser: () => Promise<void>
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
  loadCurrentUser: async () => {},
})
