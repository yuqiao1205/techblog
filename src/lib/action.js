'use server';

import { clientPromise } from './mongodb';
import { ObjectId } from 'mongodb';

export const getPosts = async () => {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection('posts').find({}).sort({ created: -1 }).toArray();
  return JSON.parse(JSON.stringify(posts));
};

export const getPostById = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
  return JSON.parse(JSON.stringify(post));
};

export const getPostBySlug = async (slug) => {
  const client = await clientPromise;
  const db = client.db();
  const post = await db.collection('posts').findOne({ slug: slug });
  return JSON.parse(JSON.stringify(post));
};

export const getUserById = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ id: id });
  return JSON.parse(JSON.stringify(user));
};

export const getCategories = async () => {
  const client = await clientPromise;
  const db = client.db();
  const categories = await db.collection('categories').find({}).sort({ name: 1 }).toArray();
  return JSON.parse(JSON.stringify(categories));
};

export const getRelatedPosts = async (category, excludeId, limit = 5) => {
  const client = await clientPromise;
  const db = client.db();
  const relatedPosts = await db.collection('posts')
    .find({ category, _id: { $ne: new ObjectId(excludeId) } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return JSON.parse(JSON.stringify(relatedPosts));
};

export const createPost = async (postData) => {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('posts').insertOne(postData);
  return JSON.parse(JSON.stringify(result));
};

export const updatePost = async (id, updateData) => {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('posts').updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  return JSON.parse(JSON.stringify(result));
};

export const deletePost = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
  return JSON.parse(JSON.stringify(result));
};

// Server actions for client components
export async function deletePostAction(formData) {
  'use server';

  const id = formData.get('id');
  if (!id) return { error: 'Post ID is required' };

  try {
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return { error: 'Post not found' };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete post error:', error);
    return { error: 'Failed to delete post' };
  }
}

export async function updatePostAction(formData) {
  'use server';

  const id = formData.get('id');
  const title = formData.get('title');
  const content = formData.get('content');
  const excerpt = formData.get('excerpt');
  const category = formData.get('category');
  const publishedAt = formData.get('publishedAt');

  if (!id) return { error: 'Post ID is required' };

  try {
    const client = await clientPromise;
    const db = client.db();

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (category) updateData.category = category;
    if (publishedAt) updateData.publishedAt = new Date(publishedAt);

    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return { error: 'Post not found' };
    }

    return { success: true };
  } catch (error) {
    console.error('Update post error:', error);
    return { error: 'Failed to update post' };
  }
}

export async function createPostAction(formData) {
  'use server';

  const title = formData.get('title');
  const slug = formData.get('slug');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');
  const author = formData.get('author');
  const image = formData.get('image');
  const category = formData.get('category');
  const tags = formData.get('tags');
  const publishedAt = formData.get('publishedAt');

  if (!title || !slug || !excerpt || !content || !author || !image || !category) {
    return { error: 'All required fields must be provided' };
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Check if slug already exists
    const existingPost = await db.collection('posts').findOne({ slug });
    if (existingPost) {
      return { error: 'Post with this slug already exists' };
    }

    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const postData = {
      title,
      slug,
      excerpt,
      content,
      author,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      image,
      category,
      tags: tagsArray,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('posts').insertOne(postData);

    return { success: true, postId: result.insertedId.toString() };
  } catch (error) {
    console.error('Create post error:', error);
    return { error: 'Failed to create post' };
  }
}