import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { customFetch } from '../../../services/customFetch'
import { Card, Tag, Typography, Button } from 'antd'
import styles from './Article.module.scss'
import { uiUrl } from '../../../constants/envVariables'

const { Title, Paragraph } = Typography

const SingleArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  console.log(id)
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await customFetch(`/articles/${id}`)
      console.log(response)
      const data = await response.json()
      console.log(data)
      setArticle(data.article)
    }

    fetchArticle()
  }, [id])

  return (
    article && (
      <Card
        className={styles.article}
        hoverable
        cover={
          <div className={styles.imageContainer}>
            <img className={styles.image} alt={article.title} src={article.enclosure.link} />
          </div>
        }
      >
        <div className={styles.content}>
          <Title className={styles.title} level={2}>
            {article.title}
          </Title>
          <p className={styles.pubDate}>Published date : {article.pubDate}</p>
          <p className={styles.author}>Author : {article.author}</p>
          <p className={styles.description}>Résume :</p>
          <Paragraph className={styles.description}>
            {article.description.replace(/<p>|<\/p>|<img[^>]*>/g, '')}
          </Paragraph>
          <div className={styles.categories}>
            {article.categories.map((category, index) => (
              <Tag className={styles.tag} key={index}>
                {category}
              </Tag>
            ))}
          </div>
          <div className={styles.buttons}>
            <Button type="primary" href={article.link} target="_blank">
              Lire l&#39;article
            </Button>
            <a href={`${uiUrl}/articles`}>
              <Button type="default">Retour</Button>
            </a>
          </div>
        </div>
      </Card>
    )
  )
}

export default SingleArticle
