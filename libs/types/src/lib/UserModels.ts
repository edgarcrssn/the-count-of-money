export type RegisterDto = {
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
  email: string
  nickname: string
  role: 'USER' | 'ADMIN'
}
