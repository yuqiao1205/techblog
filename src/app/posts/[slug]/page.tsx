import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Post, Category } from '@/types'
import categoriesData from '@/data/categories.json'
import { getPostBySlug, getRelatedPosts, incrementViews } from '@/lib/action'
import LikeButton from '@/components/LikeButton'
import PostStats from '@/components/PostStats'
import { PostProvider } from '@/components/PostProvider'

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

  // Increment views
  const updatedViews = await incrementViews(post._id || post.id)
  post.views = updatedViews

  const category = categories.find(cat => cat.id === post.category)
  const relatedPosts = await getRelatedPosts(post.category, post._id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const processContent = (content: string) => {
    return content
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p class="mb-4">')
      .replace(/$/, '</p>')
  }

  return (
    <PostProvider initialLikes={post.likes || 0}>
      <div className="min-h-screen">
      {/* Hero Section with Post Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{backgroundImage: `url(${post.image})`}}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-16 right-12 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-end h-full pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              {/* Category and Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
                  {category?.name}
                </span>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  By {post.author}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>

              {/* Stats */}
              <PostStats initialViews={post.views} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
              {/* Reading Time Estimate */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700/50">
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{Math.ceil(post.content.length / 1000)} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-700/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-700/50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="text-gray-200 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: processContent(post.content) }} />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Author Section */}
            <div className="mt-8 bg-gradient-to-r from-gray-800/40 to-gray-700/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{post.author}</h3>
                  <p className="text-gray-400">Tech Blogger & Developer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Passionate about sharing knowledge in AI, web development, and emerging technologies.
                Always exploring new ways to solve problems and create amazing digital experiences.
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl border border-gray-700/50 transition-all duration-200 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>

              <div className="flex space-x-3">
                <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-gray-300 rounded-xl border border-gray-700/50 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                <LikeButton postId={String(post._id || post.id)} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              {/* Related Posts */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost: any) => (
                      <Link key={relatedPost._id} href={`/posts/${relatedPost.slug}`} className="flex space-x-3 group">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                          <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">{relatedPost.title}</h4>
                          <p className="text-xs text-gray-500">{formatDate(relatedPost.publishedAt)}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No related posts found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PostProvider>
  )
}