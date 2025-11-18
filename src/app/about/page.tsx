import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Me | Tech Blog',
  description: 'Learn more about the author of this tech blog.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg)`}}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">About Me</h1>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
              Get to know the person behind the code
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white leading-tight">Welcome to My Tech Journey</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Welcome to my personal tech blog! I'm passionate about technology and love sharing my knowledge and experiences in the ever-evolving world of software development.
                </p>
                <p className="text-lg">
                  With expertise in various areas including AI, machine learning, web development, and more, I aim to provide valuable insights, tutorials, and discussions on the latest trends and technologies.
                </p>
                <p className="text-lg">
                  When I'm not coding or writing, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Areas of Interest</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Artificial Intelligence and Machine Learning",
                  "Large Language Models (LLMs) and RAG systems",
                  "Model Context Protocols (MCPs)",
                  "Frontend and Backend Development",
                  "Web Technologies and Frameworks",
                  "Database Design and Management",
                  "DevOps and Cloud Computing"
                ].map((interest, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/50 backdrop-blur-sm hover:from-gray-700/50 hover:to-gray-600/50 transition-all duration-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm font-medium">{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Let's Connect</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm always excited to connect with fellow developers, discuss new technologies, and collaborate on interesting projects. Feel free to reach out through the contact page!
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get In Touch
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 backdrop-blur-sm"
                >
                  View My Blog
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="relative space-y-6">
            {/* Main Profile Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative">
                <Image
                  // src="https://ik.imagekit.io/0ycpbhqv8/yan2.JPG"
                  // src="https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg"
                  src="https://ik.imagekit.io/0ycpbhqv8/yan2.jpg?updatedAt=1763496312628"
                  alt="Yanpeng - Tech Blogger & Developer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>

                {/* Profile Badge */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-medium">👨‍💻 Developer</span>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-md rounded-lg p-3 border border-gray-700/50">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">Yanpeng</div>
                    <div className="text-xs text-gray-300">Tech Blogger & Developer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Image - Workspace */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative">
                <Image
                  src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
                  alt="Developer Workspace"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

                {/* Workspace Badge */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-medium">💼 Workspace</span>
                </div>

                {/* Tech Icons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                    <span className="text-white text-sm">⚛️</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                    <span className="text-white text-sm">🚀</span>
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-md rounded-lg p-3 border border-gray-700/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-white">5+ Years</div>
                      <div className="text-xs text-gray-300">Experience</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">24</div>
                      <div className="text-xs text-gray-300">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}