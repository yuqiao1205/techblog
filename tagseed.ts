import connectToDatabase from './src/lib/mongodb'
import Tag from './src/models/Tag'

const tags = [
  { name: 'ai', count: 0 },
  { name: 'llm', count: 0 },
  { name: 'react', count: 0 },
  { name: 'nodejs', count: 0 },
  { name: 'java', count: 0 },
]

async function seedTags() {
  try {
    await connectToDatabase()
    console.log('Connected to database')

    for (const tagData of tags) {
      const existingTag = await Tag.findOne({ name: tagData.name })
      if (!existingTag) {
        await Tag.create(tagData)
        console.log(`Created tag: ${tagData.name}`)
      } else {
        console.log(`Tag already exists: ${tagData.name}`)
      }
    }

    console.log('Tag seeding completed')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding tags:', error)
    process.exit(1)
  }
}

seedTags()