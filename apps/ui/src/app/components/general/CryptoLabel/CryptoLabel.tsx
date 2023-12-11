import React from 'react'
import styles from './CryptoLabel.module.scss'

type Props = {
  crypto: {
    name: string
    symbol: string
    image: string
  }
}

export const CryptoLabel = ({ crypto }: Props) => {
  return (
    <span className={styles.cryptoLabel}>
      <img src={crypto.image} alt={`${crypto.name} icon`} className={styles.icon} />
      {crypto.name} <span className={styles.symbol}>- {crypto.symbol.toUpperCase()}</span>
    </span>
  )
}
