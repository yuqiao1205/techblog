import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Post, Category } from '@/types'
import categoriesData from '@/data/categories.json'
import { getPostBySlug } from '@/lib/action'

const categories = categoriesData as Category[]

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await getPostBySlug(slug)
    return post as Post | null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Tech Blog`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const category = categories.find(cat => cat.id === post.category)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">
              {category?.name}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{post.views} views</span>
            <span>{post.likes} likes</span>
          </div>
        </header>

        <div className="h-96 mb-8 rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${post.image})`}}>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      <div className="border-t pt-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Blog
        </Link>
      </div>
    </div>
  )
}