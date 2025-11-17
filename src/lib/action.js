'use server';

import { clientPromise } from './mongodb';

export const getPosts = async () => {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection('posts').find({}).sort({ created: -1 }).toArray();
  return posts;
};

export const getPostById = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const post = await db.collection('posts').findOne({ id: id });
  return post;
};

export const getPostBySlug = async (slug) => {
  const client = await clientPromise;
  const db = client.db();
  const post = await db.collection('posts').findOne({ slug: slug });
  return post;
};

export const getUserById = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ id: id });
  return user;
};

export const createPost = async (postData) => {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('posts').insertOne(postData);
  return result;
};

export const updatePost = async (id, updateData) => {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('posts').updateOne({ id: id }, { $set: updateData });
  return result;
};

export const deletePost = async (id) => {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('posts').deleteOne({ id: id });
  return result;
};