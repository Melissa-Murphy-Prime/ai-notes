import Link from 'next/link'

export default function Home() {
  const properties = [
    {
      id: 1,
      name: 'Riverside Luxury Cabin',
      location: 'Coeur d\'Alene, ID',
      image: '/properties/1.jpg',
      price: '$250/night',
      beds: 3,
    },
    {
      id: 2,
      name: 'Mountain View Retreat',
      location: 'Sandpoint, ID',
      image: '/properties/2.jpg',
      price: '$200/night',
      beds: 2,
    },
    {
      id: 3,
      name: 'Downtown Spokane Loft',
      location: 'Spokane, WA',
      image: '/properties/3.jpg',
      price: '$150/night',
      beds: 2,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-100 to-neutral-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-neutral-900">
            Welcome to Porch & Pine
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Discover exceptional properties in Spokane, Coeur d'Alene, and Sandpoint
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-accent-green text-white px-8 py-3 rounded hover:bg-opacity-90 transition inline-block"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="border-2 border-accent-green text-accent-green px-8 py-3 rounded hover:bg-accent-green hover:text-white transition inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-neutral-300 h-64 flex items-center justify-center">
                  <p className="text-neutral-500">[Property Image]</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">{property.name}</h3>
                  <p className="text-neutral-600 mb-4">{property.location}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-accent-green font-bold">{property.price}</span>
                    <span className="text-neutral-600">{property.beds} beds</span>
                  </div>
                  <Link href={`/properties/${property.id}`} className="text-accent-green font-bold hover:underline">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="bg-accent-green text-white px-8 py-3 rounded hover:bg-opacity-90 transition inline-block"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-neutral-100">
        <div className="container">
          <h2 className="text-center mb-12">Why Choose Porch & Pine</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Expert Management</h3>
              <p className="text-neutral-600">
                Experienced team dedicated to maintaining your property and ensuring guest satisfaction
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Prime Locations</h3>
              <p className="text-neutral-600">
                Strategically located properties in the most desirable communities across the Pacific Northwest
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Seamless Experience</h3>
              <p className="text-neutral-600">
                From booking to check-in, we handle everything to ensure a smooth and delightful experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="mb-6">Ready to Find Your Perfect Home?</h2>
          <p className="text-lg text-neutral-600 mb-8">
            Get in touch with our team to learn more about our properties and services
          </p>
          <Link
            href="/contact"
            className="bg-accent-green text-white px-8 py-3 rounded hover:bg-opacity-90 transition inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  )
}
