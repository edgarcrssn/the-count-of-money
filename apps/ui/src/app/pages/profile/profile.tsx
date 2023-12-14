import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUser/CurrentUserContext'
import { UserProfileHeader } from '../../components/general/User/UserProfileHeader/UserProfileHeader'
import { useQuery } from 'react-query'
import { userService } from '../../../services/userService'
import { Skeleton } from 'antd'
import { toast } from 'sonner'
import styles from './profile.module.scss'
import { TrackedCryptocurrenciesCard } from '../../components/general/User/TrackedCryptocurrenciesCard/TrackedCryptocurrenciesCard'
import { DefinedKeywordsCard } from '../../components/general/User/DefinedKeywordsCard/DefinedKeywordsCard'

const Profile = () => {
  const { nickname } = useParams()

  if (!nickname) throw new Error('Nickname is required')

  const { currentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  const isMyProfile = nickname === currentUser?.nickname

  const {
    isLoading,
    isSuccess,
    data: user,
  } = useQuery({
    queryKey: 'user',
    queryFn: () => userService.getProfile(nickname),
    onError: (err: Error) => {
      if (err.message === 'Not Found') {
        toast.error('User not found')
        navigate('/404')
      } else {
        // eslint-disable-next-line no-console
        console.error(err)
        toast.error('An unknown error occurred')
      }
    },
  })

  if (isLoading) return <Skeleton active />

  if (isSuccess)
    return (
      <div className={styles.profile}>
        <UserProfileHeader user={user} />
        <div className={styles.grid}>
          <TrackedCryptocurrenciesCard nickname={nickname} editable={isMyProfile} />
          <DefinedKeywordsCard keywords={['keyword 1', 'keyword 2']} />
        </div>
      </div>
    )
}

export default Profile
