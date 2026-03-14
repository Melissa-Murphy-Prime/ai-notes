import Link from 'next/link'

export default function Blog() {
  // TODO: Fetch from Sanity CMS
  const posts = [
    {
      id: 1,
      title: 'Spring Maintenance Tips for Your Property',
      excerpt: 'As spring arrives, here are essential maintenance tasks to prepare your property for the season.',
      date: '2024-03-10',
      author: 'Melissa Murphy',
      category: 'Maintenance',
      image: '[Post Image]',
    },
    {
      id: 2,
      title: 'Exploring Sandpoint: A Renter\'s Guide',
      excerpt: 'Discover the best attractions, restaurants, and outdoor activities in beautiful Sandpoint.',
      date: '2024-03-05',
      author: 'Julie Shenyar',
      category: 'Destination Guide',
      image: '[Post Image]',
    },
    {
      id: 3,
      title: 'Why Invest in Pacific Northwest Properties',
      excerpt: 'The Pacific Northwest real estate market offers unique opportunities for property investors.',
      date: '2024-02-28',
      author: 'Angela Petersen',
      category: 'Investment',
      image: '[Post Image]',
    },
    {
      id: 4,
      title: 'Short-Term Rental Trends 2024',
      excerpt: 'What\'s changing in the short-term rental market and how property owners can adapt.',
      date: '2024-02-20',
      author: 'Melissa Murphy',
      category: 'Market News',
      image: '[Post Image]',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-100 to-neutral-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Blog & News</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Stay updated with tips, guides, and news from Porch & Pine Properties
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container max-w-3xl">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={`pb-8 mb-8 ${index !== posts.length - 1 ? 'border-b border-neutral-200' : ''}`}
            >
              <div className="flex gap-4 mb-4 flex-wrap">
                <span className="text-sm bg-neutral-200 text-neutral-700 px-3 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-neutral-600">{post.date}</span>
                <span className="text-sm text-neutral-600">by {post.author}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                <Link href={`/blog/${post.id}`} className="hover:text-accent-green transition">
                  {post.title}
                </Link>
              </h2>

              <p className="text-neutral-700 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.id}`}
                className="text-accent-green font-bold hover:underline inline-block"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-neutral-100">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Stay Updated</h2>
          <p className="text-neutral-600 mb-8">
            Subscribe to our newsletter for property tips, market updates, and exclusive offers
          </p>
          <form className="flex gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border border-neutral-300 rounded focus:outline-none focus:border-accent-green"
              required
            />
            <button
              type="submit"
              className="bg-accent-green text-white px-8 py-3 rounded font-bold hover:bg-opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
