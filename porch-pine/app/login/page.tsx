'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-100 to-neutral-50 min-h-screen flex items-center">
        <div className="container max-w-md">
          <div className="bg-white rounded shadow-lg p-8">
            <h1 className="text-3xl font-serif font-bold text-center mb-8">Owner & Renter Login</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
                  placeholder="Your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-green text-white py-2 rounded font-bold hover:bg-opacity-90 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 p-4 bg-neutral-100 rounded">
              <p className="text-sm text-neutral-600 mb-2">
                <strong>Demo credentials:</strong>
              </p>
              <p className="text-sm text-neutral-600 mb-2">
                Email: test@example.com<br />
                Password: password
              </p>
              <p className="text-xs text-neutral-500 mt-3">
                This is a placeholder. In production, this will connect with your Rentec system for real authentication.
              </p>
            </div>

            <div className="mt-8 text-center">
              <p className="text-neutral-600 mb-4">
                Need help? <a href="mailto:broker@propertybyprime.com" className="text-accent-green hover:underline">Contact us</a>
              </p>
              <Link href="/" className="text-accent-green hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
