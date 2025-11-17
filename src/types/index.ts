export interface Category {
  id: string
  name: string
  description: string
}

export interface Post {
  _id?: string
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  image: string
  category: string
  tags: string[]
  views: number
  likes: number
}