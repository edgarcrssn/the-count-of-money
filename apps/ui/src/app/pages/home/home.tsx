import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import { manageToken } from '../../../utils/manageToken'
import withAuth from '../../components/hoc/withAuth'
import { customFetch } from '../../../services/customFetch'
// import styles from './Home.module.scss'

interface IUser {
  nickname: string
}

export function Home() {
  const [me, setMe] = useState<IUser | null>(null)

  useEffect(() => {
    const getMyProfile = async () => {
      const response = await customFetch('/users/profile', {
        headers: {
          Authorization: `Bearer ${manageToken.get()}`,
        },
      })
      const data = await response.json()

      if (data.me) setMe(data.me)
    }
    getMyProfile()
  }, [])

  return <DashboardLayout>Hello{me?.nickname ? ` ${me.nickname}!` : ''}</DashboardLayout>
}

export default withAuth(Home)
