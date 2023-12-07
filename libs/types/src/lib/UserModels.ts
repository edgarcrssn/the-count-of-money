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
