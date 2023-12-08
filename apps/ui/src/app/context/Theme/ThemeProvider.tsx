import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Theme, ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const userBrowserThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const getDefaultTheme = (): Theme => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme ? JSON.parse(storedTheme) : userBrowserThemeIsDark ? Theme.DARK : Theme.LIGHT
  }

  const [currentTheme, setCurrentTheme] = useState<Theme>(getDefaultTheme())

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme))
  }, [currentTheme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = ({ matches: userBrowserThemeIsDark }: MediaQueryListEvent) => {
      setCurrentTheme(userBrowserThemeIsDark ? Theme.DARK : Theme.LIGHT)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const value = {
    currentTheme,
    setCurrentTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
