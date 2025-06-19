'use client';

import { useState } from 'react';
import type { FireRiskMapControlsProps } from './types';

export function FireRiskMapControls({
  fireHazardLayers,
  activeLayers,
  onLayerToggle,
  isLoading,
  error
}: FireRiskMapControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLayerToggle = (layerId: string) => {
    const isCurrentlyActive = activeLayers.some(layer => layer.id === layerId);
    onLayerToggle(layerId, !isCurrentlyActive);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Map Layers</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Status Indicators */}
          {isLoading && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600 mr-2"></div>
              Loading data...
            </div>
          )}

          {error && (
            <div className="flex items-center text-sm text-red-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          {/* Layer Toggles */}
          {fireHazardLayers.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                Fire Hazard Layers
              </h4>
              {fireHazardLayers.map((layer) => {
                const isActive = activeLayers.some(activeLayer => activeLayer.id === layer.id);
                return (
                  <label key={layer.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleLayerToggle(layer.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{layer.name}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              No fire hazard layers available
            </div>
          )}

          {/* Legend */}
          {activeLayers.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                Risk Levels
              </h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs text-gray-600">Low Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-xs text-gray-600">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-xs text-gray-600">High Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs text-gray-600">Very High Risk</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 