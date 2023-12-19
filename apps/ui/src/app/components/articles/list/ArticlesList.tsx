import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Pagination, Tag } from 'antd'
import { customFetch } from '../../../../services/customFetch'
import { PlusOutlined, ReadOutlined } from '@ant-design/icons'
import { uiUrl } from '../../../../constants/envVariables'
import styles from './ArticlesList.module.scss'

const { Meta } = Card

const Articles: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ articles: [], totalArticles: 0 })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(24)

  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page)
    navigate(`/articles?page=${page}`)
  }

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await customFetch(`/articles?page=${page}&pageSize=${pageSize}`).then((response) =>
        response.json(),
      )

      if (response && Array.isArray(response.data)) {
        setData({ articles: response.data, totalArticles: response.totalArticles })
      } else {
        // eslint-disable-next-line no-console
        console.error('Invalid response:', response)
      }
    }

    fetchArticles()
  }, [page, pageSize])

  return (
    <>
      <div className={styles.articlesContainer}>
        {data.articles.map((article) => {
          const cleanedDescription = article.description.replace(/<p>|<\/p>|<img[^>]*>/g, '')

          return (
            <Card
              className={styles.articleCard}
              cover={<img className={styles.articleImage} alt={article.title} src={article.enclosure?.link} />}
              hoverable
              key={article.id}
              actions={[
                // eslint-disable-next-line react/jsx-key
                <a href={article.link}>
                  Lire la suite <ReadOutlined key="lire-plus" />
                </a>,
                // eslint-disable-next-line react/jsx-key
                <a href={`${uiUrl}/article/${article.id}`}>
                  En savoir <PlusOutlined key="en-savoir-plus" />
                </a>,
              ]}
            >
              <Meta
                className={styles.content}
                title={article.title}
                description={
                  <>
                    <div className={styles.tagContainer}>
                      {article.categories.map((category, index) => (
                        <Tag className={styles.tag} key={index}>
                          {category}
                        </Tag>
                      ))}
                    </div>{' '}
                    <div className={styles.description}>{cleanedDescription}</div>
                  </>
                }
              />
            </Card>
          )
        })}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={data.totalArticles}
          onChange={handlePageChange}
          onShowSizeChange={setPageSize}
        />
      </div>{' '}
    </>
  )
}

export default Articles
