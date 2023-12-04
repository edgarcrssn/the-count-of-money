import { customFetch } from './customFetch'

// TODO create a lib to store interfaces and types and share them among the apps (api and ui)
export interface RegisterDto {
  nickname: string
  email: string
  password: string
}

export interface LoginDto {
  nickname: string
  password: string
}

export interface JwtPayload {
  id: number
  email: string
  nickname: string
  role: 'ADMIN' | 'USER'
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

  async verifyAuthStatus(token: string): Promise<{ status: number; data?: { me: JwtPayload } }> {
    return customFetch('/users/verify-auth-status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
