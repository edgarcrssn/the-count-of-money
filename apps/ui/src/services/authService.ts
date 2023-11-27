import { customFetch } from './customFetch'

export interface LoginDto {
  username: string
  nickname: string
}

export const authService = {
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
}
