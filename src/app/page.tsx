'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post, Category } from '@/types'
import categoriesData from '@/data/categories.json'
import { getPosts } from '@/lib/action'
import FancyDropdown from '@/components/FancyDropdown'

const categories = categoriesData as Category[]

const categoryOptions = [
  { value: '', label: 'All Categories', icon: '🌟' },
  ...categories.map(cat => ({ value: cat.id, label: cat.name, icon: '📁' }))
]

const sortOptions = [
  { value: 'latest', label: 'Latest', icon: '🕒' },
  { value: 'popular', label: 'Most Popular', icon: '🔥' }
]

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg)`}}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">Lauren's Tech Blog</h1>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
              Discover insights on AI, web development, databases, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 border-2 border-gray-600/50 rounded-2xl bg-gradient-to-r from-gray-800/80 via-gray-700/70 to-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/70 backdrop-blur-md shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 text-lg hover:border-gray-500/70"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <FancyDropdown
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="🌟 All Categories"
              className="min-w-[180px]"
            />
            <FancyDropdown
              options={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as 'latest' | 'popular')}
              placeholder="🕒 Sort by"
              className="min-w-[160px]"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">Error: {error}</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPosts.map((post: Post) => (
                <article key={post._id || post.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                  <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url(${post.image})`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700/50">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <span className="ml-3">{formatDate(post.publishedAt)}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-white hover:text-blue-400 transition-colors">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
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
                <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
