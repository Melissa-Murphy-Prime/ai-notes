export default function About() {
  const team = [
    {
      name: 'Melissa Murphy',
      role: 'Co-Owner & Property Manager',
      bio: 'Melissa brings over 15 years of property management experience to Porch & Pine. She is dedicated to ensuring every guest has an exceptional experience and every property is maintained to the highest standards.',
      email: 'melissa@propertybyprime.com',
    },
    {
      name: 'Angela Petersen',
      role: 'Co-Owner & Operations Director',
      bio: 'Angela oversees all operations and guest services. Her attention to detail and commitment to excellence ensures seamless experiences from booking to check-out.',
      email: 'broker@propertybyprime.com',
    },
    {
      name: 'Julie Shenyar',
      role: 'Guest Relations Specialist',
      bio: 'Julie is the friendly face behind our guest services, ensuring every guest feels welcome and supported throughout their stay.',
      email: 'julie@propertybyprime.com',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-100 to-neutral-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Porch & Pine</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Dedicated to providing exceptional property management and unforgettable vacation experiences in the Pacific Northwest
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="mb-8">Our Story</h2>
          <div className="space-y-6 text-neutral-700 leading-relaxed">
            <p>
              Founded with a passion for the Pacific Northwest, Porch & Pine Properties brings together expertise, dedication, and a deep love for our communities. We believe that exceptional property management is about more than just maintaining buildings—it's about creating spaces where memories are made and lives are enriched.
            </p>
            <p>
              Our presence across Spokane, Coeur d'Alene, and Sandpoint reflects our commitment to serving these unique communities with the highest standards of professionalism and care.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container">
          <h2 className="text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded shadow-lg p-8">
                <div className="bg-neutral-300 h-48 rounded mb-6 flex items-center justify-center">
                  <p className="text-neutral-500">[Profile Photo]</p>
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">{member.name}</h3>
                <p className="text-accent-green font-bold mb-4">{member.role}</p>
                <p className="text-neutral-600 mb-4">{member.bio}</p>
                <a href={`mailto:${member.email}`} className="text-accent-green hover:underline">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Integrity</h3>
              <p className="text-neutral-600">
                We operate with honesty and transparency in all our dealings
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Excellence</h3>
              <p className="text-neutral-600">
                We maintain the highest standards in property management and guest service
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Community</h3>
              <p className="text-neutral-600">
                We are invested in the communities we serve
              </p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Sustainability</h3>
              <p className="text-neutral-600">
                We care for our properties and environment responsibly
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
