import Link from 'next/link'
import { getTags } from '@/lib/action'

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  const tags = await getTags()

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50 overflow-hidden">
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

      <div className="relative container mx-auto px-4 py-12 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                TechFlow
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Exploring the frontiers of technology, from AI and machine learning to web development and beyond.
              Sharing insights, tutorials, and the latest trends in tech.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-2.448-2.31 0-1.255.906-2.181 2.182-2.181.741 0 1.358.365 1.718.941v-.941h1.782v6.14H9.945v-.941c-.36.576-.977.941-1.718.941zm3.591-4.581c-.741 0-1.358-.365-1.718-.941V12.57c.36-.576.977-.941 1.718-.941 1.049 0 1.782.676 1.782 1.662 0 .986-.733 1.662-1.782 1.662zm4.048 4.581c-1.297 0-2.448-.49-2.448-2.31 0-1.255.906-2.181 2.182-2.181.741 0 1.358.365 1.718.941v-.941h1.782v6.14h-1.782v-.941c-.36.576-.977.941-1.718.941z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 hover:text-purple-400 transition-colors duration-200 cursor-pointer">
                  AI & Machine Learning
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-purple-400 transition-colors duration-200 cursor-pointer">
                  Web Development
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-purple-400 transition-colors duration-200 cursor-pointer">
                  Programming
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-purple-400 transition-colors duration-200 cursor-pointer">
                  DevOps & Cloud
                </span>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag: any) => (
                <span
                  key={tag.name}
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 cursor-pointer"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} TechFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </footer>
  )
}