'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-100 to-neutral-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-serif font-bold mb-4">Spokane</h3>
              <p className="text-neutral-600">
                Property management & rentals<br />
                Spokane, WA
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif font-bold mb-4">Coeur d'Alene</h3>
              <p className="text-neutral-600">
                Property management & rentals<br />
                Coeur d'Alene, ID
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif font-bold mb-4">Sandpoint</h3>
              <p className="text-neutral-600">
                Property management & rentals<br />
                Sandpoint, ID
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="bg-white rounded shadow-lg p-8 md:p-12">
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your message! We'll get back to you shortly.
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
                  required
                >
                  <option value="">Select a subject...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Rental Booking">Rental Booking</option>
                  <option value="Property Management">Property Management</option>
                  <option value="Maintenance">Maintenance Request</option>
                  <option value="Investment">Investment Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green h-32 resize-none"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-green text-white py-3 rounded font-bold hover:bg-opacity-90 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-neutral-200">
              <h3 className="font-bold mb-4">Quick Contact Info</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <strong>Broker:</strong> <a href="mailto:broker@propertybyprime.com" className="text-accent-green hover:underline">broker@propertybyprime.com</a>
                </li>
                <li>
                  <strong>Manager:</strong> <a href="mailto:melissa@propertybyprime.com" className="text-accent-green hover:underline">melissa@propertybyprime.com</a>
                </li>
                <li>
                  <strong>Guest Services:</strong> <a href="mailto:julie@propertybyprime.com" className="text-accent-green hover:underline">julie@propertybyprime.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
