'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, WMSTileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FireRiskMapClientProps, MapClickEvent, MapBounds, FireHazardLayer } from './types';

// Fix for default markers in React-Leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map event handlers component - separated to prevent re-renders
function MapEventHandlers({
  onMapClick,
  onBoundsChange
}: {
  onMapClick: (lat: number, lng: number) => void;
  onBoundsChange: (bounds: MapBounds) => void;
}) {
  const map = useMap();

  useEffect(() => {
    console.log('MapEventHandlers: Setting up event listeners');
    
    const handleClick = (e: MapClickEvent) => {
      console.log('Map clicked at:', e.latlng.lat, e.latlng.lng);
      onMapClick(e.latlng.lat, e.latlng.lng);
    };

    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      const newBounds = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      };
      console.log('Map bounds changed:', newBounds);
      onBoundsChange(newBounds);
    };

    const handleZoomEnd = () => {
      console.log('Map zoom ended at level:', map.getZoom());
    };

    // Add event listeners
    map.on('click', handleClick);
    map.on('moveend', handleMoveEnd);
    map.on('zoomend', handleZoomEnd);

    // Cleanup function
    return () => {
      console.log('MapEventHandlers: Cleaning up event listeners');
      map.off('click', handleClick);
      map.off('moveend', handleMoveEnd);
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, onMapClick, onBoundsChange]); // Keep dependencies to ensure proper cleanup

  return null;
}

// Map initialization component - runs only once
function MapInitializer({
  bounds
}: {
  bounds: MapBounds;
}) {
  const map = useMap();
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) {
      console.log('MapInitializer: Already initialized, skipping');
      return;
    }

    console.log('MapInitializer: Setting up California bounds and constraints');
    
    // Set California bounds with proper coordinates
    const californiaBounds = [
      [bounds.south, bounds.west], // Southwest
      [bounds.north, bounds.east]  // Northeast
    ] as L.LatLngBoundsLiteral;

    console.log('California bounds:', californiaBounds);

    // Set max bounds to prevent users from panning outside California
    map.setMaxBounds(californiaBounds);
    
    // Set zoom constraints
    map.setMinZoom(5);
    map.setMaxZoom(15);
    
    // Use fitBounds to properly center and zoom to show all of California
    // Only do this once on initialization
    map.fitBounds(californiaBounds, {
      padding: [20, 20], // Add some padding
      maxZoom: 8 // Don't zoom in too much when fitting bounds
    });

    console.log('MapInitializer: Initial setup complete');
    isInitialized.current = true;
  }, [map, bounds.south, bounds.west, bounds.north, bounds.east]); // Include all bounds dependencies

  return null;
}

export function FireRiskMapClient({
  initialCenter,
  initialZoom,
  bounds,
  fireHazardLayers,
  onMapClick,
  onBoundsChange,
  onLoadingStateChange
}: FireRiskMapClientProps) {
  const [isMapReady, setIsMapReady] = useState(false);

  // Memoize callbacks to prevent unnecessary re-renders
  const handleMapClick = useCallback((lat: number, lng: number) => {
    console.log('FireRiskMapClient: Map clicked at', lat, lng);
    onMapClick(lat, lng);
  }, [onMapClick]);

  const handleBoundsChange = useCallback((newBounds: MapBounds) => {
    console.log('FireRiskMapClient: Bounds changed', newBounds);
    onBoundsChange(newBounds);
  }, [onBoundsChange]);

  const handleLoadingStateChange = useCallback((loading: boolean) => {
    console.log('FireRiskMapClient: Loading state changed to', loading);
    onLoadingStateChange(loading);
  }, [onLoadingStateChange]);

  // Handle map ready state
  useEffect(() => {
    console.log('FireRiskMapClient: Setting up loading state');
    handleLoadingStateChange(true);
    
    // Simulate map loading time
    const timer = setTimeout(() => {
      setIsMapReady(true);
      handleLoadingStateChange(false);
      console.log('FireRiskMapClient: Map ready');
    }, 1000);

    return () => {
      console.log('FireRiskMapClient: Cleaning up loading timer');
      clearTimeout(timer);
    };
  }, [handleLoadingStateChange]);

  // Memoize the render function for fire hazard layers
  const renderFireHazardLayer = useCallback((layer: FireHazardLayer) => {
    console.log('Rendering fire hazard layer:', layer.id);
    
    switch (layer.type) {
      case 'wms':
        return (
          <WMSTileLayer
            key={layer.id}
            url={layer.url}
            layers={layer.id}
            format="image/png"
            transparent={true}
            opacity={layer.opacity}
            attribution={layer.attribution}
            zIndex={layer.zIndex || 100}
          />
        );
      case 'geojson':
        // This would be implemented when you have GeoJSON data
        console.log('GeoJSON layer not yet implemented:', layer.id);
        return null;
      case 'tile':
        return (
          <TileLayer
            key={layer.id}
            url={layer.url}
            opacity={layer.opacity}
            attribution={layer.attribution}
            zIndex={layer.zIndex || 100}
          />
        );
      default:
        console.log('Unknown layer type:', layer.type);
        return null;
    }
  }, []);

  // Don't render until map is ready
  if (!isMapReady) {
    console.log('FireRiskMapClient: Map not ready, showing loading');
    return null;
  }

  console.log('FireRiskMapClient: Rendering map with center:', initialCenter, 'zoom:', initialZoom);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={initialZoom}
        style={{ 
          height: '100%', 
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
        zoomControl={true}
        attributionControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        minZoom={5}
        maxZoom={15}
        maxBounds={[
          [bounds.south, bounds.west],
          [bounds.north, bounds.east]
        ]}
        maxBoundsViscosity={1.0}
        whenReady={() => {
          console.log('MapContainer: Map ready callback');
        }}
      >
        {/* Map initialization - runs only once */}
        <MapInitializer bounds={bounds} />

        {/* Base tile layer - OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Fire hazard layers */}
        {fireHazardLayers.map(renderFireHazardLayer)}

        {/* Event handlers */}
        <MapEventHandlers
          onMapClick={handleMapClick}
          onBoundsChange={handleBoundsChange}
        />
      </MapContainer>
    </div>
  );
} 