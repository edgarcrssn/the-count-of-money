import { AliasToken } from 'antd/es/theme/interface'
import variables from '../styles/variables.module.scss'

const { ralewayFont, bitcoinOrange, sunYellow, pureWhite, offWhite, darkNavy, charcoalGray } = variables

const antdThemeToken: Partial<AliasToken> = {
  fontFamily: ralewayFont,
  colorPrimary: bitcoinOrange,
  colorLink: bitcoinOrange,
}

export const antdLightThemeToken: Partial<AliasToken> = {
  ...antdThemeToken,
  colorTextBase: darkNavy,
  colorBgContainer: pureWhite,
  colorBgElevated: offWhite,
  colorBgLayout: offWhite,
}

export const antdDarkThemeToken: Partial<AliasToken> = {
  ...antdThemeToken,
  colorTextBase: pureWhite,
  colorBgContainer: charcoalGray,
  colorBgElevated: darkNavy,
  colorBgLayout: darkNavy,
  colorLinkHover: sunYellow,
}
