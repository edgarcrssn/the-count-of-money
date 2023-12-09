import React, { PropsWithChildren, useEffect, useState } from 'react'
import { CurrentUserContext } from './CurrentUserContext'
import { authService } from '../../../services/authService'
import { manageToken } from '../../../utils/manageToken'
import { JwtPayload } from '@the-count-of-money/types'
import { toast } from 'sonner'

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
  const [currentUserIsLoading, setCurrentUserIsLoading] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<JwtPayload | null>(null)

  const loadCurrentUser = async () => {
    const token = manageToken.get()
    if (!token) {
      setCurrentUser(null)
      setCurrentUserIsLoading(false)
      return
    }

    try {
      setCurrentUserIsLoading(true)
      const response = await authService.verifyAuthStatus(token)
      setCurrentUserIsLoading(false)

      if (response.status === 200 && response.data) {
        setCurrentUser(response.data.me)
      } else {
        manageToken.remove()
        setCurrentUser(null)
        toast.info('Your session has expired', { description: 'You have been disconnected.' })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('An error occurred while fetching user auth state (loadCurrentUser): ', error)
      manageToken.remove()
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    loadCurrentUser()

    const intervalId = setInterval(() => {
      loadCurrentUser()
    }, 60000) // 60s

    return () => clearInterval(intervalId)
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    loadCurrentUser,
    currentUserIsLoading,
    setCurrentUserIsLoading,
  }

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
