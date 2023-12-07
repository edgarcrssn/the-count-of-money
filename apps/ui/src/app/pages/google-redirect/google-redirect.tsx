import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { authService } from '../../../services/authService'
import { manageToken } from '../../../utils/manageToken'
import withoutAuth from '../../components/hoc/withoutAuth'

const GoogleRedirect = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      if (!code) return navigate('/login')

      const response = await authService.loginWithGoogle(code)

      if ([200, 201].includes(response.status) && response.data) {
        const token = response.data.token
        manageToken.set(token)
        toast.success(`You ${response.status === 200 ? 'logged in' : 'registered'} with Google successfully`)
        return navigate('/')
      }

      if (response.status === 409) {
        toast.error('An already registered account is linked to this email address', {
          description: 'Try login in with password.',
        })
        return navigate('/login')
      }

      toast.error(`An unknown error occurred while login in with Google (${response.status})`, {
        description: 'Please contact the support.',
      })
      navigate('/login')
    }

    handleCallback()
  }, [navigate, searchParams])

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingOutlined />
    </div>
  )
}

export default withoutAuth(GoogleRedirect)
