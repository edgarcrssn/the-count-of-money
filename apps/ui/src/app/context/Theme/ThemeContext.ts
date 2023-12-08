import { createContext } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface CurrentUserContextType {
  readonly currentTheme: Theme
  readonly setCurrentTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<CurrentUserContextType>({
  currentTheme: Theme.LIGHT,
  setCurrentTheme: () => null,
})
