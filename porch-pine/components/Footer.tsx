import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12 mt-20">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-serif font-bold mb-4">Porch & Pine</h3>
          <p className="text-neutral-300">
            Property management and short-term rentals in the Pacific Northwest.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-neutral-300">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/properties" className="hover:text-white transition">Properties</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Locations</h4>
          <ul className="space-y-2 text-neutral-300">
            <li>Spokane, WA</li>
            <li>Coeur d'Alene, ID</li>
            <li>Sandpoint, ID</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-neutral-300 mb-2">
            <a href="mailto:broker@propertybyprime.com" className="hover:text-white transition">
              broker@propertybyprime.com
            </a>
          </p>
          <p className="text-neutral-300">
            <a href="mailto:melissa@propertybyprime.com" className="hover:text-white transition">
              melissa@propertybyprime.com
            </a>
          </p>
          <p className="text-neutral-300">
            <a href="mailto:julie@propertybyprime.com" className="hover:text-white transition">
              julie@propertybyprime.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
        <p>&copy; 2024 Porch & Pine Properties. All rights reserved.</p>
      </div>
    </footer>
  )
}
