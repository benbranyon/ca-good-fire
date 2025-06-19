import Link from 'next/link';
import { ArrowRightIcon, MapIcon, SparklesIcon, ShieldCheckIcon, FireIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline';

const features = [
  {
    id: 'fire-risk-mapping',
    title: 'Fire Risk Assessment & Mapping',
    description: 'Interactive maps showing fire hazard severity zones, historical fire data, and real-time risk assessments across California.',
    icon: MapIcon,
    href: '/fire-risk-map',
    color: 'bg-red-50 text-red-600',
    borderColor: 'border-red-200'
  },
  {
    id: 'native-plants',
    title: 'Native Plant Recommendations',
    description: 'Curated database of California native plants optimized for fire resistance, drought tolerance, and ecosystem health.',
    icon: SparklesIcon,
    href: '/native-plants',
    color: 'bg-green-50 text-green-600',
    borderColor: 'border-green-200'
  },
  {
    id: 'defensible-space',
    title: 'Defensible Space Planning',
    description: 'Step-by-step guidance for creating effective defensible space zones around your property using native landscaping.',
    icon: ShieldCheckIcon,
    href: '/defensible-space',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-200'
  },
  {
    id: 'prescribed-fire',
    title: 'Prescribed Fire Tracking',
    description: 'Monitor and track prescribed fire activities, burn permits, and controlled burn planning across California.',
    icon: FireIcon,
    href: '/prescribed-fire',
    color: 'bg-orange-50 text-orange-600',
    borderColor: 'border-orange-200'
  },
  {
    id: 'property-assessment',
    title: 'Property Assessment Tools',
    description: 'Comprehensive property evaluation tools to assess fire risk, vegetation management needs, and improvement opportunities.',
    icon: HomeIcon,
    href: '/property-assessment',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'border-purple-200'
  },
  {
    id: 'community-resources',
    title: 'Community Resources',
    description: 'Connect with local fire departments, conservation groups, and community wildfire protection programs.',
    icon: UsersIcon,
    href: '/community-resources',
    color: 'bg-indigo-50 text-indigo-600',
    borderColor: 'border-indigo-200'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <FireIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Fire Defense CA</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/fire-risk-map" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fire Risk Map
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              California Fire Defense
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Landscaping
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create fire-safe landscapes using California&apos;s native plants. 
              Our comprehensive platform helps you build resilient, beautiful, and 
              fire-resistant properties across California&apos;s diverse ecosystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fire-risk-map"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Fire Risk Map
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/native-plants"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Browse Native Plants
                <SparklesIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Fire Defense Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to create fire-safe landscapes 
              that protect your property while supporting California&apos;s native ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={feature.href}
                className="group block p-8 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-lg"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-red-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Learn more
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">58</div>
              <div className="text-gray-300">California Counties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">6,000+</div>
              <div className="text-gray-300">Native Plant Species</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Fire-Safe Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Protect Your Property?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your fire-safe landscaping journey today. Get personalized recommendations 
            based on your location and property characteristics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fire-risk-map"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start with Fire Risk Assessment
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Expert Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <FireIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Fire Defense CA</span>
              </div>
              <p className="text-gray-400">
                Building fire-safe landscapes across California&apos;s diverse ecosystems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/fire-risk-map" className="hover:text-white transition-colors">Fire Risk Map</Link></li>
                <li><Link href="/native-plants" className="hover:text-white transition-colors">Native Plants</Link></li>
                <li><Link href="/defensible-space" className="hover:text-white transition-colors">Defensible Space</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with the latest fire safety information and native plant recommendations.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fire Defense CA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
