import React from 'react'
import styles from './UserProfileHeader.module.scss'
import { CalendarOutlined } from '@ant-design/icons'
import { UserInformations } from '@the-count-of-money/types'
import { Avatar, Typography } from 'antd'

type Props = {
  user: UserInformations
}

export const UserProfileHeader = ({ user }: Props) => {
  const { nickname, first_name, last_name, created_at } = user
  const fullName = `${first_name} ${last_name}`

  const createdAt = new Date(created_at)

  return (
    <div className={styles.userProfileHeader}>
      <Avatar size={126}>{(first_name[0] + last_name[0]).toUpperCase()}</Avatar>
      <div className={styles.userInfosContainer}>
        <Typography.Title level={1} style={{ margin: 0 }}>
          {nickname}
        </Typography.Title>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {fullName}
        </Typography.Title>
        <Typography.Text type="secondary">
          <CalendarOutlined /> Member since {createdAt.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography.Text>
      </div>
    </div>
  )
}
