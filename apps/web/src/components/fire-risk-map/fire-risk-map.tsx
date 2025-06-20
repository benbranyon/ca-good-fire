'use client';

import { Suspense, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FireRiskMapErrorBoundary } from './fire-risk-map-error-boundary';
import { FireRiskMapLoading } from './fire-risk-map-loading';
import { FireRiskMapControls } from './fire-risk-map-controls';
import type { FireRiskMapProps, MapBounds, FireHazardLayer } from './types';

// Dynamically import the map component to prevent SSR issues
const FireRiskMapClient = dynamic(
  () => import('./fire-risk-map-client').then(mod => ({ default: mod.FireRiskMapClient })),
  {
    ssr: false,
    loading: () => <FireRiskMapLoading />
  }
);

export function FireRiskMap({
  initialCenter = { lat: 36.7783, lng: -119.4179 }, // California center
  initialZoom = 6,
  bounds = {
    north: 42.0,
    south: 32.5,
    east: -114.1,
    west: -124.4
  },
  fireHazardLayers = [],
  onMapClick,
  onBoundsChange,
  className = '',
  height = '600px',
  showControls = true,
  showFireHazardLayer = true
}: FireRiskMapProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBounds, setCurrentBounds] = useState<MapBounds>(bounds);
  const [activeLayers, setActiveLayers] = useState<FireHazardLayer[]>(
    showFireHazardLayer ? fireHazardLayers : []
  );

  const handleMapClick = useCallback((lat: number, lng: number) => {
    try {
      console.log('FireRiskMap: Handling map click at', lat, lng);
      onMapClick?.(lat, lng);
    } catch (err) {
      console.error('Error handling map click:', err);
      setError('Failed to process map click');
    }
  }, [onMapClick]);

  const handleBoundsChange = useCallback((newBounds: MapBounds) => {
    try {
      console.log('FireRiskMap: Handling bounds change', newBounds);
      setCurrentBounds(newBounds);
      onBoundsChange?.(newBounds);
    } catch (err) {
      console.error('Error handling bounds change:', err);
      setError('Failed to update map bounds');
    }
  }, [onBoundsChange]);

  const handleLayerToggle = useCallback((layerId: string, isActive: boolean) => {
    console.log('FireRiskMap: Toggling layer', layerId, 'to', isActive);
    setActiveLayers(prev => {
      if (isActive) {
        const layer = fireHazardLayers.find((l: FireHazardLayer) => l.id === layerId);
        return layer ? [...prev, layer] : prev;
      } else {
        return prev.filter((l: FireHazardLayer) => l.id !== layerId);
      }
    });
  }, [fireHazardLayers]);

  const handleError = useCallback((errorMessage: string) => {
    console.error('FireRiskMap: Error occurred:', errorMessage);
    setError(errorMessage);
    setIsLoading(false);
  }, []);

  const handleLoadingState = useCallback((loading: boolean) => {
    console.log('FireRiskMap: Loading state changed to', loading);
    setIsLoading(loading);
    if (loading) {
      setError(null);
    }
  }, []);

  return (
    <div 
      className={`relative w-full ${className}`} 
      style={{ 
        height,
        minHeight: '400px', // Ensure minimum height
        position: 'relative',
        overflow: 'hidden' // Prevent any overflow issues
      }}
    >
      <FireRiskMapErrorBoundary onError={handleError}>
        <Suspense fallback={<FireRiskMapLoading />}>
          <FireRiskMapClient
            initialCenter={initialCenter}
            initialZoom={initialZoom}
            bounds={currentBounds}
            fireHazardLayers={activeLayers}
            onMapClick={handleMapClick}
            onBoundsChange={handleBoundsChange}
            onLoadingStateChange={handleLoadingState}
            onError={handleError}
          />
          
          {showControls && (
            <FireRiskMapControls
              fireHazardLayers={fireHazardLayers}
              activeLayers={activeLayers}
              onLayerToggle={handleLayerToggle}
              isLoading={isLoading}
              error={error}
            />
          )}
        </Suspense>
      </FireRiskMapErrorBoundary>
    </div>
  );
} 