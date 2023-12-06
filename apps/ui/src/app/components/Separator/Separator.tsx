import React from 'react'
import styles from './Separator.module.scss'

interface Props {
  label?: string
}

export const Separator = ({ label = 'or' }: Props) => {
  return (
    <div className={styles.separator}>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
