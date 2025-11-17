const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Simple random helpers
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSentence() {
  const words = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'in', 'web', 'development', 'AI', 'machine', 'learning', 'database', 'frontend', 'backend', 'cloud', 'devops'];
  const length = randomInt(3, 8);
  return words.slice(0, length).join(' ') + '.';
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function randomParagraphs(min, max) {
  const count = randomInt(min, max);
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(randomSentence() + ' ' + randomSentence() + ' ' + randomSentence());
  }
  return paragraphs.join('\n\n');
}

// Categories
const categories = [
  {
    id: 'ai-llm-rag',
    name: 'AI, LLM, RAG',
    description: 'Artificial Intelligence, Large Language Models, and Retrieval-Augmented Generation'
  },
  {
    id: 'frontend-backend',
    name: 'Frontend & Backend',
    description: 'Web development technologies for client and server sides'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'General web development practices and tools'
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'Database design, management, and technologies'
  },
  {
    id: 'news',
    name: 'News',
    description: 'Latest news and updates in technology'
  }
];

// Generate fake posts
function generatePosts(count = 50) {
  const posts = [];
  const authors = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Wilson', 'Charlie Brown'];
  const tagPool = ['javascript', 'react', 'nextjs', 'typescript', 'ai', 'machine-learning', 'database', 'mongodb', 'web-development', 'frontend', 'backend', 'api', 'cloud', 'devops', 'security', 'performance', 'testing', 'design'];

  for (let i = 0; i < count; i++) {
    const category = randomElement(categories);
    const title = randomSentence();
    const slug = slugify(title);
    const excerpt = randomSentence() + ' ' + randomSentence();
    const content = randomParagraphs(5, 15);
    const author = randomElement(authors);
    const publishedAt = new Date(Date.now() - randomInt(0, 2 * 365 * 24 * 60 * 60 * 1000)).toISOString();
    const image = `https://via.placeholder.com/800x400/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${encodeURIComponent(title.slice(0, 20))}`;
    const tags = [];
    const tagCount = randomInt(2, 5);
    for (let j = 0; j < tagCount; j++) {
      tags.push(randomElement(tagPool));
    }
    const views = randomInt(100, 10000);
    const likes = randomInt(0, 500);

    posts.push({
      id: crypto.randomUUID(),
      title,
      slug,
      excerpt,
      content,
      author,
      publishedAt,
      image,
      category: category.id,
      tags: [...new Set(tags)], // unique tags
      views,
      likes
    });
  }

  return posts;
}

// Generate fake users (for comments or authors)
function generateUsers(count = 20) {
  const users = [];
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Wilson', 'Brown', 'Davis', 'Miller', 'Garcia', 'Rodriguez', 'Martinez'];

  for (let i = 0; i < count; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    users.push({
      id: crypto.randomUUID(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      avatar: `https://via.placeholder.com/100x100/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${firstName[0]}${lastName[0]}`,
      bio: randomSentence() + ' ' + randomSentence(),
      createdAt: new Date(Date.now() - randomInt(0, 3 * 365 * 24 * 60 * 60 * 1000)).toISOString()
    });
  }

  return users;
}

// Main function
function main() {
  console.log('Generating fake data...');

  const posts = generatePosts(50);
  const users = generateUsers(20);

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to files
  fs.writeFileSync(path.join(outputDir, 'fake-posts.json'), JSON.stringify(posts, null, 2));
  fs.writeFileSync(path.join(outputDir, 'fake-categories.json'), JSON.stringify(categories, null, 2));
  fs.writeFileSync(path.join(outputDir, 'fake-users.json'), JSON.stringify(users, null, 2));

  console.log('Fake data generated successfully!');
  console.log(`Generated ${posts.length} posts, ${categories.length} categories, and ${users.length} users.`);
  console.log('Files saved to data/ directory.');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generatePosts, generateUsers, categories };