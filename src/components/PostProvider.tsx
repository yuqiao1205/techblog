'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PostContextType {
  likes: number
  updateLikes: (newLikes: number) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

interface PostProviderProps {
  children: ReactNode
  initialLikes: number
}

export function PostProvider({ children, initialLikes }: PostProviderProps) {
  const [likes, setLikes] = useState(initialLikes)

  const updateLikes = (newLikes: number) => {
    setLikes(newLikes)
  }

  return (
    <PostContext.Provider value={{ likes, updateLikes }}>
      {children}
    </PostContext.Provider>
  )
}

export function usePost() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider')
  }
  return context
}