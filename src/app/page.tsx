'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post, Category } from '@/types'
import categoriesData from '@/data/categories.json'
import { getPosts } from '@/lib/action'

const categories = categoriesData as Category[]

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await getPosts()
      setPosts(data as unknown as Post[])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter((post: Post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    filtered.sort((a: Post, b: Post) => {
      if (sortBy === 'latest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else {
        return b.views - a.views
      }
    })

    return filtered
  }, [posts, searchTerm, selectedCategory, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg)`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Tech Blog</h1>
            <p className="text-lg md:text-xl">
              Discover insights on AI, web development, databases, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPosts.map((post: Post) => (
                <article key={post._id || post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${post.image})`}}>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <span className="ml-2">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>By {post.author}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.views} views</span>
                        <span>{post.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredAndSortedPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
