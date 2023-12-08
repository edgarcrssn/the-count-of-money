import { AliasToken } from 'antd/es/theme/interface'
import variables from '../styles/variables.module.scss'

const { bitcoinOrange, ralewayFont, pureWhite } = variables

const antdThemeToken: Partial<AliasToken> = {
  fontFamily: ralewayFont,
  colorPrimary: bitcoinOrange,
  colorLink: bitcoinOrange,
}

export const antdLightThemeToken: Partial<AliasToken> = {
  ...antdThemeToken,
  colorBgBase: pureWhite,
}

export const antdDarkThemeToken: Partial<AliasToken> = {
  ...antdThemeToken,
  colorPrimary: 'red',
}
