'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-3 py-2 border border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 backdrop-blur-sm"
    >
      Logout
    </button>
  )
}