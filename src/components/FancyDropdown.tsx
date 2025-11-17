'use client'

import { useState, useRef, useEffect } from 'react'

interface DropdownOption {
  value: string
  label: string
  icon?: string
}

interface FancyDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function FancyDropdown({ options, value, onChange, placeholder = "Select option", className = "" }: FancyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const selected = options.find(option => option.value === value)
    setSelectedOption(selected || null)
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 pr-12 border-2 border-gray-600/50 rounded-2xl bg-gradient-to-r from-gray-800/80 via-gray-700/70 to-gray-800/80 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400/70 backdrop-blur-md shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer text-lg hover:border-gray-500/70 flex items-center justify-between group"
      >
        <span className="flex items-center">
          {selectedOption?.icon && <span className="mr-3 text-lg">{selectedOption.icon}</span>}
          <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <svg
          className={`w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gradient-to-br from-gray-800/95 via-gray-700/90 to-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-blue-500/20 hover:via-purple-500/10 hover:to-cyan-500/20 transition-all duration-200 flex items-center group ${
                  value === option.value
                    ? 'bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-cyan-500/30 text-blue-300 border-l-4 border-blue-400'
                    : 'text-gray-300 hover:text-white'
                } ${index !== options.length - 1 ? 'border-b border-gray-700/30' : ''}`}
              >
                {option.icon && (
                  <span className={`mr-3 text-lg transition-colors duration-200 ${
                    value === option.value ? 'text-blue-300' : 'text-gray-400 group-hover:text-blue-300'
                  }`}>
                    {option.icon}
                  </span>
                )}
                <span className="font-medium">{option.label}</span>
                {value === option.value && (
                  <svg className="w-5 h-5 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Decorative gradient line at bottom */}
          <div className="h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50"></div>
        </div>
      )}

      {/* Hover overlay effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}