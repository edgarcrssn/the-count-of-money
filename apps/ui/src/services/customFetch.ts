import { apiKey, apiUrl } from '../constants/envVariables'
import { manageToken } from '../utils/manageToken'

export const customFetch = (endpoint: string, init?: RequestInit) => {
  return fetch(apiUrl + endpoint, {
    ...init,
    headers: {
      ...init?.headers,
      'x-api-key': apiKey,
      Authorization: `Bearer ${manageToken.get()}`,
    },
  })
}
