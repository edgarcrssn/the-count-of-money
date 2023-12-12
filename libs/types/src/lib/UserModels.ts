export type RegisterDto = {
  first_name: string
  last_name: string
  email: string
  nickname: string
  password: string
}

export type LoginDto = {
  nickname: string
  password: string
}

export type JwtPayload = {
  id: number
  first_name: string
  last_name: string
  email: string
  nickname: string
  role: 'USER' | 'ADMIN'
}

export type UserInformations = {
  id: number
  first_name: string
  last_name: string
  email: string
  nickname: string
  role: 'USER' | 'ADMIN'
  keywords: JSON
  created_at: Date
  default_currency: {
    id: number
    name: string
  }
  crypto_currencies: {
    id: string
    name: string
    symbol: string
    image: string
    available: boolean
  }[]
}
