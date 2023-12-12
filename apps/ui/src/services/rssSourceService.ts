import { RssSource } from '@prisma/client'
import { customFetch } from './customFetch'
import { RetrievedError } from './authService'
import { capitalize } from '../utils/capitalize'

export const rssSourceService = {
  async getStoredRssSources(): Promise<RssSource[]> {
    const response = await customFetch('/sources')

    if (response.ok) {
      const data = await response.json()
      return data.storedRssSources
    }

    throw new Error()
  },

  async deleteStoredRssSource(rssSourceId: number): Promise<{ deletedRssSource: RssSource }> {
    const response = await customFetch(`/sources/${rssSourceId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const retrievedError: RetrievedError = await response.json()

      if ('errors' in retrievedError)
        throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
      else throw new Error(retrievedError.message)
    }
    return await response.json()
  },
}
