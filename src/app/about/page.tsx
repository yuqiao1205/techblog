import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me | Tech Blog',
  description: 'Learn more about the author of this tech blog.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to my personal tech blog! I'm passionate about technology and love sharing my knowledge and experiences in the ever-evolving world of software development.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          With expertise in various areas including AI, machine learning, web development, and more, I aim to provide valuable insights, tutorials, and discussions on the latest trends and technologies.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          When I'm not coding or writing, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Areas of Interest</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Artificial Intelligence and Machine Learning</li>
          <li>Large Language Models (LLMs) and RAG systems</li>
          <li>Model Context Protocols (MCPs)</li>
          <li>Frontend and Backend Development</li>
          <li>Web Technologies and Frameworks</li>
          <li>Database Design and Management</li>
          <li>DevOps and Cloud Computing</li>
        </ul>
      </div>
    </div>
  )
}