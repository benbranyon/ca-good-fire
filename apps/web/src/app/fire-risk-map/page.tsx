import { FireRiskMapExample } from '@/components/fire-risk-map/fire-risk-map-example';
import Link from 'next/link';
import { ArrowLeftIcon, FireIcon } from '@heroicons/react/24/outline';

export default function FireRiskMapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <FireIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Fire Risk Map</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/native-plants" className="text-gray-600 hover:text-gray-900 transition-colors">
                Native Plants
              </Link>
              <Link href="/defensible-space" className="text-gray-600 hover:text-gray-900 transition-colors">
                Defensible Space
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            California Fire Risk Assessment Map
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl">
            Explore fire hazard severity zones, historical fire data, and real-time risk assessments 
            across California. Use this interactive map to understand fire risk in your area and 
            make informed decisions about your property&apos;s fire defense strategy.
          </p>
        </div>

        <FireRiskMapExample />
      </div>
    </div>
  );
} 