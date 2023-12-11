import { JwtPayload, LoginDto, RegisterDto } from '@the-count-of-money/types'
import { customFetch } from './customFetch'

export type RetrievedError =
  | { message: string }
  | {
      errors: {
        type: string
        value: string
        msg: string
        path: string
        location: string
      }[]
    }

export const authService = {
  async register(registerDto: RegisterDto): Promise<{
    status: number
    data?: { token: string } | RetrievedError
  }> {
    return customFetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDto),
    })
      .then((response) => {
        return response.json().then((data: { token: string } | RetrievedError) => ({
          status: response.status,
          data,
        }))
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        return { status: 500 }
      })
  },

  async login(loginDto: LoginDto): Promise<{ status: number; data?: { token: string } }> {
    return customFetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDto),
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { token: string }) => ({
            status: response.status,
            data,
          }))
        return { status: response.status }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        return { status: 500 }
      })
  },

  async getGoogleLoginUrl(): Promise<{ status: number; data?: { url: string } }> {
    return customFetch('/users/auth/google')
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { url: string }) => ({
            status: response.status,
            data,
          }))
        return { status: response.status }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        return { status: 500 }
      })
  },

  async loginWithGoogle(code: string): Promise<{ status: number; data?: { token: string } }> {
    return customFetch('/users/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { token: string }) => ({
            status: response.status,
            data,
          }))
        return { status: response.status }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        return { status: 500 }
      })
  },

  async verifyAuthStatus(): Promise<{ status: number; data?: { me: JwtPayload } }> {
    return customFetch('/users/verify-auth-status')
      .then((response) => {
        if (response.ok)
          return response.json().then((data: { me: JwtPayload }) => ({
            status: response.status,
            data,
          }))
        return { status: response.status }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        return { status: 500 }
      })
  },
}
