import Link from 'next/link'

export default function PropertyDetail({ params }: { params: { id: string } }) {
  // TODO: Fetch from Sanity CMS or Rentec API based on ID
  const property = {
    id: params.id,
    name: 'Riverside Luxury Cabin',
    location: 'Coeur d\'Alene, ID',
    price: '$250/night',
    beds: 3,
    baths: 2,
    sqft: 2000,
    type: 'Short-term Rental',
    description: 'Stunning waterfront cabin with mountain views and modern amenities.',
    longDescription: 'This beautiful cabin offers the perfect Pacific Northwest retreat. With its spacious layout, modern furnishings, and direct water access, it\'s ideal for families, groups, or anyone seeking a luxurious getaway. Enjoy breathtaking mountain views from the large deck, a full kitchen with stainless steel appliances, comfortable bedrooms, and a cozy living area perfect for gathering.',
    amenities: [
      'WiFi',
      'Full Kitchen',
      'Hot Tub',
      'Fireplace',
      'Deck with Views',
      'Parking',
      'Washer/Dryer',
      'Dishwasher',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual property video
    images: [
      '/properties/1.jpg',
      '/properties/1-2.jpg',
      '/properties/1-3.jpg',
    ],
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container py-4">
          <Link href="/properties" className="text-accent-green hover:underline">
            ← Back to Properties
          </Link>
        </div>
      </section>

      {/* Property Header */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-serif font-bold mb-4">{property.name}</h1>
              <p className="text-neutral-600 mb-6">{property.location}</p>

              {/* Gallery */}
              <div className="bg-neutral-300 h-96 rounded mb-8 flex items-center justify-center">
                <p className="text-neutral-500">[Property Images Carousel]</p>
              </div>

              {/* Video Tour */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Video Tour</h2>
                <div className="aspect-video bg-neutral-300 rounded flex items-center justify-center">
                  <p className="text-neutral-500">[YouTube Video Embedded Here]</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-4">About This Property</h2>
                <p className="text-neutral-700 mb-4 leading-relaxed">{property.longDescription}</p>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Price Card */}
              <div className="bg-white rounded shadow-lg p-8 sticky top-24">
                <p className="text-neutral-600 mb-2">Starting at</p>
                <h3 className="text-3xl font-bold text-accent-green mb-6">{property.price}</h3>

                {/* Property Details */}
                <div className="space-y-4 mb-8 pb-8 border-b border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Bedrooms</span>
                    <span className="font-bold">{property.beds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Bathrooms</span>
                    <span className="font-bold">{property.baths}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Square Feet</span>
                    <span className="font-bold">{property.sqft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Type</span>
                    <span className="font-bold">{property.type}</span>
                  </div>
                </div>

                {/* Booking CTA */}
                <button className="w-full bg-accent-green text-white py-3 rounded font-bold hover:bg-opacity-90 mb-4">
                  Check Availability
                </button>

                {/* Contact */}
                <div className="text-center pt-8 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-4">Questions?</p>
                  <a href="mailto:broker@propertybyprime.com" className="text-accent-green hover:underline font-bold">
                    Contact our team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      <section className="py-20 bg-neutral-100">
        <div className="container">
          <h2 className="text-center mb-12">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-neutral-300 h-48 flex items-center justify-center">
                  <p className="text-neutral-500">[Property Image]</p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif font-bold mb-2">Property {i}</h3>
                  <p className="text-neutral-600 mb-4">Location</p>
                  <div className="flex justify-between">
                    <span className="text-accent-green font-bold">$200/night</span>
                    <Link href={`/properties/${i + 1}`} className="text-accent-green hover:underline">
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
