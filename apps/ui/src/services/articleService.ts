import { Keyword } from '@prisma/client'
import { customFetch } from './customFetch'
import { RetrievedError } from './authService'
import { capitalize } from '../utils/capitalize'

export const articleService = {
  async getKeywords(): Promise<Keyword[]> {
    const response = await customFetch('/articles/keywords')

    if (response.ok) {
      const data = await response.json()
      return data.keywords
    }

    throw new Error()
  },

  // async getNonStoredCryptos(): Promise<Cryptocurrency[]> {
  //   const response = await customFetch('/cryptos/non-stored')

  //   if (response.ok) {
  //     const data = await response.json()
  //     return data.nonStoredCryptos
  //   }

  //   throw new Error()
  // },

  // async editStoredCrypto({ cryptoId, editCryptoDto }: EditStoredCrypto): Promise<{ editedCrypto: Cryptocurrency }> {
  //   const response = await customFetch(`/cryptos/stored/${cryptoId}`, {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(editCryptoDto),
  //   })
  //   if (!response.ok) {
  //     const retrievedError: RetrievedError = await response.json()

  //     if ('errors' in retrievedError)
  //       throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
  //     else throw new Error(retrievedError.message)
  //   }
  //   return await response.json()
  // },

  // async deleteStoredCrypto(cryptoId: string): Promise<{ deletedCrypto: Cryptocurrency }> {
  //   const response = await customFetch(`/cryptos/stored/${cryptoId}`, {
  //     method: 'DELETE',
  //   })
  //   if (!response.ok) {
  //     const retrievedError: RetrievedError = await response.json()

  //     if ('errors' in retrievedError)
  //       throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
  //     else throw new Error(retrievedError.message)
  //   }
  //   return await response.json()
  // },

  // async addStoredCrypto(createCryptoDto: Cryptocurrency): Promise<{ newCrypto: Cryptocurrency }> {
  //   const response = await customFetch(`/cryptos/stored`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(createCryptoDto),
  //   })
  //   if (!response.ok) {
  //     const retrievedError: RetrievedError = await response.json()

  //     if ('errors' in retrievedError)
  //       throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
  //     else throw new Error(retrievedError.message)
  //   }
  //   return await response.json()
  // },

  async getUserFollowedKeywords(nickname: string): Promise<Keyword[]> {
    const response = await customFetch(`/articles/keywords/${nickname}`)

    if (response.ok) {
      const data = await response.json()
      return data.followedKeywords
    }

    throw new Error()
  },

  async followKeyword(keywordId: string): Promise<{ followedKeyword: Keyword }> {
    const response = await customFetch(`/articles/keywords/${keywordId}/following`, {
      method: 'POST',
    })
    if (!response.ok) {
      const retrievedError: RetrievedError = await response.json()

      if ('errors' in retrievedError)
        throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
      else throw new Error(retrievedError.message)
    }
    return await response.json()
  },

  async unfollowKeyword(keywordId: string): Promise<{ unfollowedKeyword: Keyword }> {
    const response = await customFetch(`/articles/keywords/${keywordId}/following`, {
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
