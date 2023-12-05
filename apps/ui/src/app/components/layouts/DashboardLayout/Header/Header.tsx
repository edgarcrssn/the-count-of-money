import React from 'react'
import styles from './Header.module.scss'
import { UserAuthInformations } from './UserAuthInformations/UserAuthInformations'
import { BreadcrumbContainer } from '../BreadcrumbContainer/BreadcrumbContainer'

export const Header = () => {
  return (
    <header className={styles.header}>
      <BreadcrumbContainer />
      <div>
        <UserAuthInformations />
      </div>
    </header>
  )
}
