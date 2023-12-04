import React from 'react'
import styles from './Header.module.scss'
import { UserAuthInformations } from './UserAuthInformations/UserAuthInformations'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span role="img" aria-label="Money bag">
          💰
        </span>{' '}
        The count of money
      </div>
      <div>
        <UserAuthInformations />
      </div>
    </header>
  )
}
