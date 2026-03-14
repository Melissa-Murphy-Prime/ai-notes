'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLocation, setFilterLocation] = useState('all')

  const properties = [
    {
      id: 1,
      name: 'Riverside Luxury Cabin',
      location: 'Coeur d\'Alene, ID',
      type: 'Short-term Rental',
      price: '$250/night',
      beds: 3,
      baths: 2,
      sqft: 2000,
      description: 'Stunning waterfront cabin with mountain views',
    },
    {
      id: 2,
      name: 'Mountain View Retreat',
      location: 'Sandpoint, ID',
      type: 'Short-term Rental',
      price: '$200/night',
      beds: 2,
      baths: 1.5,
      sqft: 1500,
      description: 'Cozy retreat perfect for couples and small families',
    },
    {
      id: 3,
      name: 'Downtown Spokane Loft',
      location: 'Spokane, WA',
      type: 'Short-term Rental',
      price: '$150/night',
      beds: 2,
      baths: 1,
      sqft: 1200,
      description: 'Modern loft in the heart of downtown',
    },
    {
      id: 4,
      name: 'Forest Edge Estate',
      location: 'Coeur d\'Alene, ID',
      type: 'Short-term Rental',
      price: '$300/night',
      beds: 4,
      baths: 2.5,
      sqft: 2800,
      description: 'Spacious home surrounded by beautiful forest',
    },
    {
      id: 5,
      name: 'Lakefront Cottage',
      location: 'Sandpoint, ID',
      type: 'Short-term Rental',
      price: '$220/night',
      beds: 3,
      baths: 2,
      sqft: 1800,
      description: 'Charming lakefront property with dock access',
    },
    {
      id: 6,
      name: 'Urban Garden Apartment',
      location: 'Spokane, WA',
      type: 'Short-term Rental',
      price: '$180/night',
      beds: 2,
      baths: 1,
      sqft: 1100,
      description: 'Beautiful apartment with courtyard access',
    },
    {
      id: 7,
      name: 'Alpine Lodge',
      location: 'Sandpoint, ID',
      type: 'Short-term Rental',
      price: '$280/night',
      beds: 4,
      baths: 3,
      sqft: 2500,
      description: 'Premium lodge with all amenities',
    },
  ]

  const filtered = properties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = filterLocation === 'all' || property.location === filterLocation

    return matchesSearch && matchesLocation
  })

  const locations = ['all', ...new Set(properties.map((p) => p.location))]

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-100 to-neutral-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Properties</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Explore our curated selection of properties across the Pacific Northwest
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Search</label>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Location</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property) => (
                <div key={property.id} className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-neutral-300 h-64 flex items-center justify-center">
                    <p className="text-neutral-500">[Property Image]</p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold mb-2">{property.name}</h3>
                    <p className="text-neutral-600 mb-2">{property.location}</p>
                    <p className="text-sm text-neutral-500 mb-4">{property.sqft} sqft • {property.beds} beds • {property.baths} baths</p>
                    <p className="text-neutral-600 mb-4 line-clamp-2">{property.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-accent-green font-bold">{property.price}</span>
                      <Link href={`/properties/${property.id}`} className="text-accent-green hover:underline font-bold">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 text-lg">No properties found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Additional Rentals Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container">
          <h2 className="text-center mb-8">Looking for Investment Properties?</h2>
          <p className="text-center text-neutral-600 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive rental listings and investment opportunities. Contact us to view additional properties for rent.
          </p>
          <div className="text-center">
            <Link
              href="/contact"
              className="bg-accent-green text-white px-8 py-3 rounded hover:bg-opacity-90 transition inline-block"
            >
              Browse More Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
