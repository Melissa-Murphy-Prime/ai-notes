'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Navigation() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-bold text-accent-green">Porch & Pine</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-accent-green transition">Home</Link>
          <Link href="/about" className="hover:text-accent-green transition">About</Link>
          <Link href="/properties" className="hover:text-accent-green transition">Properties</Link>
          <Link href="/blog" className="hover:text-accent-green transition">Blog</Link>
          <Link href="/contact" className="hover:text-accent-green transition">Contact</Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:text-accent-green transition">Dashboard</Link>
              <button
                onClick={() => signOut()}
                className="bg-accent-green text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-accent-green text-white px-4 py-2 rounded hover:bg-opacity-90">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 py-4">
          <div className="container flex flex-col gap-4">
            <Link href="/" className="hover:text-accent-green transition">Home</Link>
            <Link href="/about" className="hover:text-accent-green transition">About</Link>
            <Link href="/properties" className="hover:text-accent-green transition">Properties</Link>
            <Link href="/blog" className="hover:text-accent-green transition">Blog</Link>
            <Link href="/contact" className="hover:text-accent-green transition">Contact</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-accent-green transition">Dashboard</Link>
                <button
                  onClick={() => signOut()}
                  className="bg-accent-green text-white px-4 py-2 rounded hover:bg-opacity-90 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-accent-green text-white px-4 py-2 rounded hover:bg-opacity-90">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
