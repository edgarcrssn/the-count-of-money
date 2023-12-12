import React from 'react'
import styles from './DefinedKeywordsCard.module.scss'
import { Card, Tag } from 'antd'

type Props = {
  keywords: string[]
  editable?: boolean
}

export const DefinedKeywordsCard = ({ keywords, editable = false }: Props) => {
  return (
    <Card title="Defined keywords">
      <div className={styles.tagsContainer}>
        {keywords.map((keyword) => (
          <Tag key={keyword} className={styles.tag}>
            keyword
          </Tag>
        ))}
      </div>
    </Card>
  )
}
