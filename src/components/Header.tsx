'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const linkClasses = (path: string) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-blue-400 bg-blue-500/10 rounded-md'
        : 'text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md'
    }`

  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 sticky top-0 z-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-cyan-600/10"></div>

      <nav className="relative container mx-auto px-4 py-4 flex justify-between items-center backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/yp2.jpg" alt="Techflow Logo" width={70} height={30} className="rounded-full"  />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-200 hover:via-purple-300 hover:to-pink-300 transition-all duration-300 drop-shadow-lg">TechFlow</span>
        </Link>
        <div className="hidden md:flex space-x-2">
          <Link href="/" className={linkClasses('/')}>
            Blog
          </Link>
          <Link href="/about" className={linkClasses('/about')}>
            About Me
          </Link>
          <Link href="/contact" className={linkClasses('/contact')}>
            Contact
          </Link>
          <a href="https://portfolio-six-theta-4s1jg1wwkr.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md">
            Portfolio
          </a>
          <Link href="/admin/login" className={linkClasses('/admin')}>
            Admin
          </Link>
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-gray-900/98 backdrop-blur-md border-t border-gray-700/50 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/3 to-cyan-600/5"></div>
          <div className="relative container mx-auto px-4 py-2 space-y-1">
            <Link href="/" className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/') ? 'text-blue-400 bg-blue-500/10 rounded-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md'}`} onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/about" className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/about') ? 'text-blue-400 bg-blue-500/10 rounded-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md'}`} onClick={() => setIsOpen(false)}>
              About Me
            </Link>
            <Link href="/contact" className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/contact') ? 'text-blue-400 bg-blue-500/10 rounded-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md'}`} onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <a href="https://portfolio-six-theta-4s1jg1wwkr.vercel.app/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md" onClick={() => setIsOpen(false)}>
              Portfolio
            </a>
            <Link href="/admin/login" className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive('/admin') ? 'text-blue-400 bg-blue-500/10 rounded-md' : 'text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md'}`} onClick={() => setIsOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}