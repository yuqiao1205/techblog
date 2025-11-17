import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'

// GET /api/posts - Get all posts or single post by slug
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    // If slug is provided, return single post
    if (slug) {
      const post = await Post.findOne({ slug }).lean()
      if (!post) {
        return NextResponse.json(
          { error: 'Post not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(post)
    }

    // Otherwise return all posts with filters
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'latest'

    let query: any = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }

    let sortOptions: any = {}
    if (sortBy === 'latest') {
      sortOptions.publishedAt = -1
    } else if (sortBy === 'popular') {
      sortOptions.views = -1
    }

    const posts = await Post.find(query).sort(sortOptions).lean()

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      publishedAt,
      image,
      category,
      tags
    } = body

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !author || !image || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug })
    if (existingPost) {
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 400 }
      )
    }

    const newPost = new Post({
      title,
      slug,
      excerpt,
      content,
      author,
      publishedAt: publishedAt || new Date(),
      image,
      category,
      tags: tags || []
    })

    const savedPost = await newPost.save()

    return NextResponse.json(savedPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}