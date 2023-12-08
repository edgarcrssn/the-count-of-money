import React, { PropsWithChildren, useContext } from 'react'
import { Theme, ThemeContext } from '../../../context/Theme/ThemeContext'
import { antdLightThemeToken, antdDarkThemeToken } from '../../../../constants/antdThemeToken'
import { ConfigProvider } from 'antd'

export const ThemeConfig = ({ children }: PropsWithChildren) => {
  const { currentTheme } = useContext(ThemeContext)

  const token = currentTheme === Theme.LIGHT ? antdLightThemeToken : antdDarkThemeToken

  return <ConfigProvider theme={{ token }}>{children}</ConfigProvider>
}
