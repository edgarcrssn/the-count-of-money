import { customFetch } from './customFetch'
import { RetrievedError } from './authService'
import { capitalize } from '../utils/capitalize'
import { User } from '@prisma/client'
import { EditProfileDto } from '@the-count-of-money/types'

export const userService = {
  async getProfile(nickname: string): Promise<User> {
    const response = await customFetch(`/users/profile/${nickname}`)

    if (!response.ok) {
      const retrievedError: RetrievedError = await response.json()

      if ('errors' in retrievedError)
        throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
      else throw new Error(retrievedError.message)
    }

    const data = await response.json()
    return nickname ? data.userData : data.me
  },

  async updateMyProfile(editProfileDto: EditProfileDto): Promise<{ updatedUser: User }> {
    const response = await customFetch(`/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editProfileDto),
    })

    if (!response.ok) {
      const retrievedError: RetrievedError = await response.json()

      if ('errors' in retrievedError)
        throw new Error(
          `${capitalize(retrievedError.errors[0].path.replace('_', ' '))} ${retrievedError.errors[0].msg}`,
        )
      else throw new Error(retrievedError.message)
    }

    const data = await response.json()
    return data
  },

  async deleteUser() {},
}
