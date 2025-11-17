import 'dotenv/config';
import clientPromise from './src/lib/mongodb.ts';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saltRounds = 10;

async function seed() {
  const client = await clientPromise;
  const db = client.db();

  // Clear existing data
  await db.dropDatabase();

  // Seed users
  const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/fake-users.json'), 'utf8'));
  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash('123', saltRounds);
    users.push({
      id: userData.id,
      username: userData.name.replace(/\s+/g, '').toLowerCase(),
      email: userData.email,
      password: hashedPassword,
      avatar: userData.avatar,
      isAdmin: false,
      created_at: new Date(userData.createdAt)
    });
  }

  // Add the test user
  users.push({
    id: '1',
    username: 'test',
    email: 'test@123.com',
    password: await bcrypt.hash('123', saltRounds),
    avatar: '/noavatar.png',
    isAdmin: false,
    created_at: new Date()
  });

  await db.collection('users').insertMany(users);

  // Seed categories
  const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/fake-categories.json'), 'utf8'));
  await db.collection('categories').insertMany(categoriesData);

  // Seed posts
  const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/fake-posts.json'), 'utf8'));
  await db.collection('posts').insertMany(postsData);

  console.log('Seeding completed');
  await client.close();
  process.exit(0);
}

seed().catch(console.error);