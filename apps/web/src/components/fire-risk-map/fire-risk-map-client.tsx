'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, WMSTileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { FireRiskMapClientProps, MapClickEvent, MapBounds, MapCenter, FireHazardLayer } from './types';

// Fix for default markers in React-Leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map event handlers component
function MapEventHandlers({
  onMapClick,
  onBoundsChange
}: {
  onMapClick: (lat: number, lng: number) => void;
  onBoundsChange: (bounds: MapBounds) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: MapClickEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    };

    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      });
    };

    map.on('click', handleClick);
    map.on('moveend', handleMoveEnd);

    return () => {
      map.off('click', handleClick);
      map.off('moveend', handleMoveEnd);
    };
  }, [map, onMapClick, onBoundsChange]);

  return null;
}

// Map initialization component
function MapInitializer({
  bounds,
  initialCenter,
  initialZoom
}: {
  bounds: MapBounds;
  initialCenter: MapCenter;
  initialZoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    // Set bounds to California
    map.setMaxBounds([
      [bounds.south, bounds.west],
      [bounds.north, bounds.east]
    ]);
    
    // Set initial view
    map.setView([initialCenter.lat, initialCenter.lng], initialZoom);
  }, [map, bounds, initialCenter, initialZoom]);

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

  useEffect(() => {
    onLoadingStateChange(true);
    
    // Simulate map loading time
    const timer = setTimeout(() => {
      setIsMapReady(true);
      onLoadingStateChange(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onLoadingStateChange]);

  const renderFireHazardLayer = (layer: FireHazardLayer) => {
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
        return null;
    }
  };

  if (!isMapReady) {
    return null;
  }

  return (
    <MapContainer
      center={[initialCenter.lat, initialCenter.lng]}
      zoom={initialZoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
      attributionControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
    >
      {/* Map initialization */}
      <MapInitializer
        bounds={bounds}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />

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
        onMapClick={onMapClick}
        onBoundsChange={onBoundsChange}
      />
    </MapContainer>
  );
} 