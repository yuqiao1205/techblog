'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FancyDropdown from './FancyDropdown'
import { createPostAction, updatePostAction } from '@/lib/action'

interface PostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  image: string
  category: string
  tags: string
  publishedAt: string
}

interface PostFormProps {
  initialData?: Partial<PostFormData>
  isEditing?: boolean
  postId?: string
  categories?: any[]
}

export default function PostForm({ initialData, isEditing = false, postId, categories = [] }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    author: initialData?.author || 'Admin',
    image: initialData?.image || '',
    category: initialData?.category || '',
    tags: initialData?.tags || '',
    publishedAt: initialData?.publishedAt || new Date().toISOString().split('T')[0],
  })

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError('')

    const tagsArray = formData.get('tags') ? (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(tag => tag) : []
    formData.set('tags', tagsArray.join(','))

    const result = isEditing ? await updatePostAction(formData) : await createPostAction(formData)

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/admin')
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {isEditing && postId && <input type="hidden" name="id" value={postId} />}
      <input type="hidden" name="category" value={formData.category} />
      {error && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-md p-4">
          <div className="text-red-400">{error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Category *
          </label>
          <FancyDropdown
            options={categories.map((cat: any) => ({
              value: cat.id,
              label: cat.name,
              icon: '📁'
            }))}
            value={formData.category}
            onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            placeholder="📁 Select a category"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300">
            Author *
          </label>
          <input
            type="text"
            name="author"
            id="author"
            required
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div>
          <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-300">
            Published Date *
          </label>
          <input
            type="date"
            name="publishedAt"
            id="publishedAt"
            required
            value={formData.publishedAt}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-300">
            Image URL *
          </label>
          <input
            type="url"
            name="image"
            id="image"
            required
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="react, nextjs, typescript"
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
            Excerpt *
          </label>
          <textarea
            name="excerpt"
            id="excerpt"
            required
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm backdrop-blur-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">
            Content (Markdown) *
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={15}
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm bg-gray-700/50 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="bg-gray-700/50 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 backdrop-blur-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
        </button>
      </div>
    </form>
  )
}
