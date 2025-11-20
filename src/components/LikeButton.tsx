'use client'

import { useState, useTransition } from 'react'
import { toggleLikeAction } from '@/lib/action'
import { usePost } from './PostProvider'

interface LikeButtonProps {
  postId: string
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const { updateLikes } = usePost()
  const [isPending, startTransition] = useTransition()
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('postId', postId)
      formData.append('action', isLiked ? 'unlike' : 'like')

      const result = await toggleLikeAction(formData)
      if (result.success) {
        updateLikes(result.likes)
        setIsLiked(!isLiked)
      } else {
        console.error('Toggle like failed:', result.error)
      }
    })
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`p-3 rounded-xl border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        isLiked
          ? 'bg-red-500/20 text-red-500 border-red-500/50'
          : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-red-400 border-gray-700/50'
      }`}
    >
      <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="sr-only">Like post</span>
    </button>
  )
}