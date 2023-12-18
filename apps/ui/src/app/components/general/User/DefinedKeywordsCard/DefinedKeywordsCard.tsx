import React, { useState } from 'react'
import styles from '../TrackedCryptocurrenciesCard/TrackedCryptocurrenciesCard.module.scss'
import { Badge, Card, Divider, Empty, Skeleton, Tag } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'
import { EditOutlined, MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { articleService } from '../../../../../services/articleService'

type Props = {
  nickname: string
  editable?: boolean
}

export const DefinedKeywordsCard = ({ nickname, editable = false }: Props) => {
  const [editing, setEditing] = useState(false)

  const queryClient = useQueryClient()

  const followedKeywords = useQuery({
    queryKey: 'followedKeywords',
    queryFn: () => articleService.getUserFollowedKeywords(nickname),
  })

  const availableKeywords = useQuery({
    queryKey: 'availableKeywords',
    queryFn: articleService.getKeywords,
    enabled: editing,
  })

  const followKeyword = useMutation(articleService.followKeyword, {
    onSuccess: ({ followedKeyword }) => {
      toast.success(`${followedKeyword.id} has been followed successfully`)
      queryClient.invalidateQueries('followedKeywords')
      queryClient.invalidateQueries('availableKeywords')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const unfollowKeyword = useMutation(articleService.unfollowKeyword, {
    onSuccess: ({ unfollowedKeyword }) => {
      toast.success(`${unfollowedKeyword.id} has been unfollowed successfully`)
      queryClient.invalidateQueries('followedKeywords')
      queryClient.invalidateQueries('availableKeywords')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleUnfollowKeyword = (keyword: string) => {
    if (!editable) return
    unfollowKeyword.mutate(keyword)
  }

  const handleFollowKeyword = (keyword: string) => {
    if (!editable) return
    followKeyword.mutate(keyword)
  }

  const renderUnfollowedKeywords = (): React.ReactNode => {
    if (!followedKeywords.isSuccess) return null

    if (availableKeywords.isLoading) return <Skeleton active />

    if (availableKeywords.isSuccess) {
      const followedKeywordsIds = followedKeywords.data.map((keyword) => keyword.id)

      const unfollowedKeywords = availableKeywords.data
        ?.filter((keyword) => !followedKeywordsIds.includes(keyword.id))
        .filter((keyword) => keyword.available)

      if (!unfollowedKeywords.length) return <Empty />

      return (
        <div className={styles.tagsContainer}>
          {unfollowedKeywords.map((keyword) => {
            if (!keyword.available) return null
            return (
              <Badge
                key={keyword.id}
                count={editing ? <PlusCircleFilled onClick={() => handleFollowKeyword(keyword.id)} /> : null}
              >
                <Tag className={styles.tag}>{keyword.id}</Tag>
              </Badge>
            )
          })}
        </div>
      )
    }
  }

  return (
    <Card
      title={
        <>
          {editable ? <EditOutlined className={styles.editIcon} onClick={() => setEditing(!editing)} /> : null} Followed
          keywords
        </>
      }
    >
      {followedKeywords.isLoading ? <Skeleton active /> : null}
      {followedKeywords.isError ? <Empty /> : null}
      {followedKeywords.isSuccess ? (
        <div>
          {followedKeywords.data.length <= 0 ? (
            <Empty />
          ) : (
            <div className={styles.tagsContainer}>
              {followedKeywords.data.map((keyword) => {
                if (!keyword.available) return null
                return (
                  <Badge
                    key={keyword.id}
                    count={editing ? <MinusCircleFilled onClick={() => handleUnfollowKeyword(keyword.id)} /> : null}
                  >
                    <Tag className={styles.tag}>{keyword.id}</Tag>
                  </Badge>
                )
              })}
            </div>
          )}
          {editing ? (
            <>
              <Divider orientation="left" dashed>
                Unfollowed keywords
              </Divider>
              {renderUnfollowedKeywords()}
            </>
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}
