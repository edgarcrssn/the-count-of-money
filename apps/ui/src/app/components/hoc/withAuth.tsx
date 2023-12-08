import React, { ComponentType, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { CurrentUserContext } from '../../context/CurrentUser/CurrentUserContext'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const { currentUser, loadCurrentUser } = useContext(CurrentUserContext)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const checkAuth = async () => {
        await loadCurrentUser()
        if (!currentUser) return navigate('/')
        setLoading(false)
      }
      checkAuth()
    }, [currentUser, loadCurrentUser, navigate])

    if (loading)
      return (
        <div
          style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <LoadingOutlined />
        </div>
      )

    return <WrappedComponent {...props} />
  }

  return WithAuth
}

export default withAuth
