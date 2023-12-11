import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Theme, ThemeContext } from './ThemeContext'
import { ConfigProvider, theme } from 'antd'
import { antdDarkThemeToken, antdLightThemeToken } from '../../../constants/antdThemeToken'

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

  const token = currentTheme === Theme.LIGHT ? antdLightThemeToken : antdDarkThemeToken
  const algorithm = currentTheme === Theme.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={{ token, algorithm }}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
