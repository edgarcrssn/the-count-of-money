import React, { PropsWithChildren, useContext } from 'react'
import { Theme, ThemeContext } from '../../../context/Theme/ThemeContext'
import { antdLightThemeToken, antdDarkThemeToken } from '../../../../constants/antdThemeToken'
import { ConfigProvider, theme } from 'antd'

export const ThemeConfig = ({ children }: PropsWithChildren) => {
  const { currentTheme } = useContext(ThemeContext)

  const token = currentTheme === Theme.LIGHT ? antdLightThemeToken : antdDarkThemeToken
  const algorithm = currentTheme === Theme.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm

  return <ConfigProvider theme={{ token, algorithm }}>{children}</ConfigProvider>
}
