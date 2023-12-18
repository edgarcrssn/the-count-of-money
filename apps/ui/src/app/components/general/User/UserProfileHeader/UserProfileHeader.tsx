import React, { useState } from 'react'
import styles from './UserProfileHeader.module.scss'
import { CalendarOutlined } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import { User } from '@prisma/client'
import { useMutation, useQueryClient } from 'react-query'
import { userService } from '../../../../../services/userService'
import { toast } from 'sonner'

type Props = {
  user: User
  editable?: boolean
}

export const UserProfileHeader = ({ user, editable }: Props) => {
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)

  const createdAt = new Date(user.created_at)

  const queryClient = useQueryClient()

  const editMyProfile = useMutation(userService.updateMyProfile, {
    onSuccess: ({ updatedUser }) => {
      toast.success(`Your profile has been updated successfully`)
      queryClient.invalidateQueries('userProfile')
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
                    onChange: setFirstName,
                    onCancel: () => setFirstName(user.first_name),
                    onEnd: () => editMyProfile.mutate({ first_name: firstName }),
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
                    onChange: setLastName,
                    onCancel: () => setLastName(user.first_name),
                    onEnd: () => editMyProfile.mutate({ last_name: lastName }),
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
