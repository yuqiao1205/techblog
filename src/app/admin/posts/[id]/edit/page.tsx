import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCategories } from '@/lib/action'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'
import PostForm from '@/components/PostForm'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await getServerSession(authOptions)
  const { id } = await params

  if (!session?.user?.isAdmin) {
    redirect('/admin/login')
  }

  try {
    await dbConnect()
    const post = await Post.findById(id).lean()
    const categories = await getCategories()

    if (!post) {
      redirect('/admin')
    }

    // Convert MongoDB objects to plain objects
    const postData = JSON.parse(JSON.stringify(post))

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Edit Post
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Update your blog post
              </p>
            </div>
          </div>

          <div className="mt-8">
            <PostForm
              initialData={{
                title: postData.title,
                slug: postData.slug,
                excerpt: postData.excerpt,
                content: postData.content,
                author: postData.author,
                image: postData.image,
                category: postData.category,
                tags: postData.tags?.join(', ') || '',
                publishedAt: new Date(postData.publishedAt).toISOString().split('T')[0],
              }}
              isEditing={true}
              postId={id}
              categories={categories}
            />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    redirect('/admin')
  }
}