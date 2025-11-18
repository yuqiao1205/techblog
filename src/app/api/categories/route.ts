import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Category from '@/models/Category'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const categories = await Category.find({}).sort({ name: 1 })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}