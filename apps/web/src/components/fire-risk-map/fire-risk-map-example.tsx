'use client';

import { useState } from 'react';
import { FireRiskMap } from './fire-risk-map';
import type { FireHazardLayer, MapBounds, MapCenter } from './types';

// Sample fire hazard layers for California
const sampleFireHazardLayers: FireHazardLayer[] = [
  {
    id: 'cal-fire-hazard-severity',
    name: 'Fire Hazard Severity Zones',
    description: 'CAL FIRE Fire Hazard Severity Zones for California',
    url: 'https://gis.fire.ca.gov/arcgis/rest/services/FRAP/FireHazardSeverityZones/MapServer/WMSServer',
    type: 'wms',
    opacity: 0.7,
    visible: true,
    attribution: 'CAL FIRE',
    zIndex: 100
  },
  {
    id: 'usgs-fire-perimeter',
    name: 'Recent Fire Perimeters',
    description: 'Recent wildfire perimeters from USGS',
    url: 'https://services.nationalmap.gov/arcgis/rest/services/USGSWildfireActivity/MapServer/WMSServer',
    type: 'wms',
    opacity: 0.8,
    visible: true,
    attribution: 'USGS',
    zIndex: 101
  }
];

// California bounds - corrected coordinates
const californiaBounds: MapBounds = {
  north: 42.0,
  south: 32.5,
  east: -114.1,
  west: -124.4
};

// Major California cities for reference
const californiaCities: { name: string; center: MapCenter }[] = [
  { name: 'Los Angeles', center: { lat: 34.0522, lng: -118.2437 } },
  { name: 'San Francisco', center: { lat: 37.7749, lng: -122.4194 } },
  { name: 'San Diego', center: { lat: 32.7157, lng: -117.1611 } },
  { name: 'Sacramento', center: { lat: 38.5816, lng: -121.4944 } },
  { name: 'Fresno', center: { lat: 36.7378, lng: -119.7871 } }
];

export function FireRiskMapExample() {
  const [selectedLocation, setSelectedLocation] = useState<MapCenter | null>(null);
  const [currentBounds, setCurrentBounds] = useState<MapBounds>(californiaBounds);
  const [clickCount, setClickCount] = useState(0);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setClickCount(prev => prev + 1);
    console.log(`Map clicked at: ${lat}, ${lng}`);
  };

  const handleBoundsChange = (bounds: MapBounds) => {
    setCurrentBounds(bounds);
    console.log('Map bounds changed:', bounds);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          California Fire Risk Assessment Map
        </h1>
        <p className="text-gray-600 mb-4">
          Interactive fire risk map for California&apos;s diverse ecosystems
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <FireRiskMap
          initialCenter={{ lat: 36.7783, lng: -119.4179 }} // California center
          initialZoom={6}
          bounds={californiaBounds}
          fireHazardLayers={sampleFireHazardLayers}
          onMapClick={handleMapClick}
          onBoundsChange={handleBoundsChange}
          height="600px"
          showControls={true}
          showFireHazardLayer={true}
          className="rounded-lg shadow-lg border border-gray-200"
        />
      </div>

      {/* Information Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected Location Info */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Selected Location
          </h3>
          {selectedLocation ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Latitude:</span> {selectedLocation.lat.toFixed(6)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Longitude:</span> {selectedLocation.lng.toFixed(6)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Clicks:</span> {clickCount}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Click on the map to select a location</p>
          )}
        </div>

        {/* Map Information */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Map Information
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Current Bounds:</span>
            </p>
            <p>North: {currentBounds.north.toFixed(4)}</p>
            <p>South: {currentBounds.south.toFixed(4)}</p>
            <p>East: {currentBounds.east.toFixed(4)}</p>
            <p>West: {currentBounds.west.toFixed(4)}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Navigation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {californiaCities.map((city) => (
            <button
              key={city.name}
              onClick={() => setSelectedLocation(city.center)}
              className="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fire Defense Information */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Fire Defense Zones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-green-50 rounded-md">
            <h4 className="font-medium text-green-800 mb-1">Zone 0 (0-5 feet)</h4>
            <p className="text-green-700">Immediate area around structures. Use non-combustible materials.</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-md">
            <h4 className="font-medium text-yellow-800 mb-1">Zone 1 (5-30 feet)</h4>
            <p className="text-yellow-700">Lean, clean, and green landscaping with native plants.</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-md">
            <h4 className="font-medium text-orange-800 mb-1">Zone 2 (30-100+ feet)</h4>
            <p className="text-orange-700">Reduced fuel density with strategic native plant placement.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 