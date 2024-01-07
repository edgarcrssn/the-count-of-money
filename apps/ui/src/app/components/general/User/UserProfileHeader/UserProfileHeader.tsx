import React, { useContext, useEffect, useState } from 'react'
import styles from './UserProfileHeader.module.scss'
import { CalendarOutlined } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import { User } from '@prisma/client'
import { useMutation } from 'react-query'
import { userService } from '../../../../../services/userService'
import { toast } from 'sonner'
import { CurrentUserContext } from '../../../../context/CurrentUser/CurrentUserContext'

type Props = {
  user: User
  editable?: boolean
}

export const UserProfileHeader = ({ user, editable }: Props) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)

  useEffect(() => {
    setFirstName(user.first_name)
    setLastName(user.last_name)
  }, [user])

  const createdAt = new Date(user.created_at)

  const editMyProfile = useMutation(userService.updateMyProfile, {
    onSuccess: ({ updatedUser }) => {
      toast.success(`Your profile has been updated successfully`)
      if (currentUser)
        setCurrentUser({ ...currentUser, first_name: updatedUser.first_name, last_name: updatedUser.last_name })
      setFirstName(updatedUser.first_name)
      setLastName(updatedUser.last_name)
    },
    onError: (error: Error) => {
      toast.error(error.message)
      setFirstName(user.first_name)
      setLastName(user.last_name)
    },
  })

  return (
    <div className={styles.userProfileHeader}>
      <Avatar size={126}>{(firstName[0] + lastName[0]).toUpperCase()}</Avatar>
      <div className={styles.userInfosContainer}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {user.nickname}
        </Typography.Title>
        <span className={styles.fullName}>
          <Typography.Title
            level={2}
            style={{ margin: 0 }}
            editable={
              editable
                ? {
                    onChange: (value) => editMyProfile.mutate({ first_name: value.trim() }),
                    onCancel: () => setFirstName(user.first_name),
                  }
                : undefined
            }
          >
            {firstName}
          </Typography.Title>
          <Typography.Title
            level={2}
            style={{ margin: 0 }}
            editable={
              editable
                ? {
                    onChange: (value) => editMyProfile.mutate({ last_name: value.trim() }),
                    onCancel: () => setLastName(user.last_name),
                  }
                : undefined
            }
          >
            {lastName}
          </Typography.Title>
        </span>
        <Typography.Text type="secondary">
          <CalendarOutlined /> Member since {createdAt.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography.Text>
      </div>
    </div>
  )
}
