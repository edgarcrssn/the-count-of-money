import React, { ComponentType, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { manageToken } from '../../../utils/manageToken'
import { LoadingOutlined } from '@ant-design/icons'

const withoutAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithoutAuth: React.FC<P> = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const token = manageToken.get()
      if (token) navigate('/')
      setLoading(false)
    }, [navigate])

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

  return WithoutAuth
}

export default withoutAuth
