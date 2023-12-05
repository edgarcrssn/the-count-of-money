import { Cryptocurrency } from '@prisma/client'

export const isValidCryptoId = (id: string, cryptoIds: Cryptocurrency[]) => {
  return cryptoIds.some((crypto) => crypto.id === id)
}
