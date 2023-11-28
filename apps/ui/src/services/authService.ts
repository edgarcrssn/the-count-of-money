import { customFetch } from './customFetch'

export interface RegisterDto {
  username: string
  email: string
  nickname: string
}

export interface LoginDto {
  username: string
  nickname: string
}

type Data =
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
    data?: { token: string } | Data
  }> {
    return customFetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDto),
    })
      .then((response) => {
        return response.json().then((data: { token: string } | Data) => ({
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
}
