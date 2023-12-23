export type GetArticleDto = {
  id: string
  title: string
  content: string
  pubDate: string
  author: string
  link: string
  categories: string[]
  guid: string
  thumbnail: string
  description: string
  enclosure: {
    link: string
  }
}
