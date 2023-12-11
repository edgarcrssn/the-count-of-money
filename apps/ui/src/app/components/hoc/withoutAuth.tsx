import React, { ComponentType, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUser/CurrentUserContext'
import { Skeleton } from 'antd'

const withoutAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithoutAuth: React.FC<P> = (props) => {
    const { currentUser } = useContext(CurrentUserContext)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (currentUser) navigate('/')
      else setLoading(false)
    }, [currentUser, navigate])

    if (loading) return <Skeleton active />

    return <WrappedComponent {...props} />
  }

  return WithoutAuth
}

export default withoutAuth
