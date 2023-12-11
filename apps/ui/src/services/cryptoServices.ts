import { Cryptocurrency } from '@prisma/client'
import { customFetch } from './customFetch'
import { EditCryptoDto } from '@the-count-of-money/types'
import { RetrievedError } from './authService'
import { capitalize } from '../utils/capitalize'

export type EditStoredCrypto = {
  cryptoId: number
  editCryptoDto: EditCryptoDto
}

export const cryptoService = {
  async getStoredCryptos(): Promise<{ storedCryptos: Cryptocurrency[] }> {
    return customFetch('/cryptos/stored')
      .then((response) => {
        if (response.ok) return response.json()
        throw Error()
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        throw Error(error)
      })
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

  async deletedStoredCrypto(cryptoId: number): Promise<{ deletedCrypto: Cryptocurrency }> {
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
}
