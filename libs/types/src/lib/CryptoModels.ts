export type CreateCryptoDto = {
  name: string
  available?: boolean
}

export type EditCryptoDto = Partial<CreateCryptoDto>
