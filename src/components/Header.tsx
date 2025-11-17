'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Tech Blog
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About Me
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <Link href="/about" className="block text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              About Me
            </Link>
            <Link href="/" className="block text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className="block text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}