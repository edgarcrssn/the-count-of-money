import React, { ComponentType, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { CurrentUserContext } from '../../context/CurrentUser/CurrentUserContext'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const { currentUser } = useContext(CurrentUserContext)

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (!currentUser) return navigate('/')
      setLoading(false)
    }, [currentUser, navigate])

    if (loading)
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingOutlined />
        </div>
      )

    return <WrappedComponent {...props} />
  }

  return WithAuth
}

export default withAuth
