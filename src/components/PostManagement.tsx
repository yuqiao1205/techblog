'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { deletePostAction } from '@/lib/action'

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  author: string
  publishedAt: string
  category: string
  image: string
  views: number
  likes: number
}

export default function PostManagement() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        setError('Failed to fetch posts')
      }
    } catch (error) {
      setError('An error occurred while fetching posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (formData: FormData) => {
    const id = formData.get('id') as string

    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    const result = await deletePostAction(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setPosts(posts.filter(post => post._id !== id))
      setError('')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800/50 rounded-md p-4">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm shadow-xl overflow-hidden sm:rounded-md border border-gray-700/50">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-white">
          Posts ({posts.length})
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-400">
          Manage all blog posts
        </p>
      </div>
      <ul role="list" className="divide-y divide-gray-700/50">
        {posts.map((post) => (
          <li key={post._id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-700/20 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                {/* Thumbnail Image */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-600/50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/64x64/374151/9CA3AF?text=No+Image';
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-blue-400 truncate hover:text-blue-300">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-400 truncate">
                        {post.excerpt}
                      </p>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-700/50">
                          {post.category}
                        </span>
                        <span className="ml-2 text-gray-400">By {post.author}</span>
                        <span className="ml-2 text-gray-600">•</span>
                        <span className="ml-2 text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span className="ml-2 text-gray-600">•</span>
                        <span className="ml-2 text-gray-400">{post.views} views</span>
                        <span className="ml-2 text-gray-600">•</span>
                        <span className="ml-2 text-gray-400">{post.likes} likes</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="inline-flex items-center px-3 py-1.5 border border-yellow-600/50 shadow-sm text-xs font-medium rounded-md text-yellow-400 bg-yellow-900/20 hover:bg-yellow-800/30 hover:border-yellow-500/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                      <Link
                        href={`/admin/posts/${post._id}/edit`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        Edit
                      </Link>
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="id" value={post._id} />
                        <button
                          type="submit"
                          className="inline-flex items-center px-3 py-1.5 border border-red-800/50 shadow-sm text-xs font-medium rounded-md text-red-400 bg-red-900/20 hover:bg-red-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No posts found.</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            Create your first post
          </Link>
        </div>
      )}
    </div>
  )
}