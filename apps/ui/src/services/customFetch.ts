import { apiKey, apiUrl } from '../constants/envVariables'

export const customFetch = (endpoint: string, init?: RequestInit) => {
  return fetch(apiUrl + endpoint, {
    ...init,
    headers: {
      ...init?.headers,
      'x-api-key': apiKey,
    },
  })
}
