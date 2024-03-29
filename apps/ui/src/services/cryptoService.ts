import { Cryptocurrency } from '@prisma/client'
import { customFetch } from './customFetch'
import { EditCryptoDto } from '@the-count-of-money/types'
import { RetrievedError } from './authService'
import { capitalize } from '../utils/capitalize'

export type EditStoredCrypto = {
  cryptoId: string
  editCryptoDto: EditCryptoDto
}

export const cryptoService = {
  async getStoredCryptos(): Promise<Cryptocurrency[]> {
    const response = await customFetch('/cryptos/stored')

    if (response.ok) {
      const data = await response.json()
      return data.storedCryptos
    }

    throw new Error()
  },

  async getNonStoredCryptos(): Promise<Cryptocurrency[]> {
    const response = await customFetch('/cryptos/non-stored')

    if (response.ok) {
      const data = await response.json()
      return data.nonStoredCryptos
    }

    throw new Error()
  },

  async editStoredCrypto({ cryptoId, editCryptoDto }: EditStoredCrypto): Promise<{ editedCrypto: Cryptocurrency }> {
    const response = await customFetch(`/cryptos/stored/${cryptoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editCryptoDto),
    })
    if (!response.ok) {
      const retrievedError: RetrievedError = await response.json()

      if ('errors' in retrievedError)
        throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
      else throw new Error(retrievedError.message)
    }
    return await response.json()
  },

  async deleteStoredCrypto(cryptoId: string): Promise<{ deletedCrypto: Cryptocurrency }> {
    const response = await customFetch(`/cryptos/stored/${cryptoId}`, {
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

  async addStoredCrypto(createCryptoDto: Cryptocurrency): Promise<{ newCrypto: Cryptocurrency }> {
    const response = await customFetch(`/cryptos/stored`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCryptoDto),
    })
    if (!response.ok) {
      const retrievedError: RetrievedError = await response.json()

      if ('errors' in retrievedError)
        throw new Error(`${capitalize(retrievedError.errors[0].path)} ${retrievedError.errors[0].msg}`)
      else throw new Error(retrievedError.message)
    }
    return await response.json()
  },

  async getUserTrackedCryptos(nickname: string): Promise<Cryptocurrency[]> {
    const response = await customFetch(`/cryptos/tracked/${nickname}`)

    if (response.ok) {
      const data = await response.json()
      return data.trackedCryptos
    }

    throw new Error()
  },

  async trackCrypto(cryptoId: string): Promise<{ trackedCrypto: Cryptocurrency }> {
    const response = await customFetch(`/cryptos/${cryptoId}/track`, {
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

  async untrackCrypto(cryptoId: string): Promise<{ untrackedCrypto: Cryptocurrency }> {
    const response = await customFetch(`/cryptos/${cryptoId}/track`, {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getCryptoById(cryptoId: string): Promise<any> {
    const response = await customFetch(`/cryptos/${cryptoId}`)

    if (response.ok) {
      const data = await response.json()
      return data.cryptocurrency
    }

    throw new Error()
  },
}
