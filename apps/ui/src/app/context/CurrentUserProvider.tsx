import React, { PropsWithChildren, useEffect, useState } from 'react'
import { CurrentUserContext } from './CurrentUserContext'
import { JwtPayload, authService } from '../../services/authService'
import { manageToken } from '../../utils/manageToken'

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<JwtPayload | null>(null)

  const loadCurrentUser = async () => {
    const token = manageToken.get()
    if (!token) return setCurrentUser(null)

    const response = await authService.verifyAuthStatus(token)
    if (response.status === 200 && response.data) return setCurrentUser(response.data.me)

    manageToken.remove()
    setCurrentUser(null)
  }

  useEffect(() => {
    loadCurrentUser()
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    loadCurrentUser,
  }

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
