export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapCenter {
  lat: number;
  lng: number;
}

export interface FireHazardLayer {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'wms' | 'wfs' | 'tile' | 'geojson';
  opacity: number;
  visible: boolean;
  attribution?: string;
  zIndex?: number;
  style?: {
    color: string;
    weight: number;
    opacity: number;
    fillColor: string;
    fillOpacity: number;
  };
}

export interface FireRiskData {
  id: string;
  location: MapCenter;
  riskLevel: 'low' | 'medium' | 'high' | 'very-high';
  confidence: number;
  lastUpdated: string;
  dataSource: string;
  properties: Record<string, string | number | boolean>;
}

export interface FireRiskMapProps {
  initialCenter?: MapCenter;
  initialZoom?: number;
  bounds?: MapBounds;
  fireHazardLayers?: FireHazardLayer[];
  onMapClick?: (lat: number, lng: number) => void;
  onBoundsChange?: (bounds: MapBounds) => void;
  onRiskDataLoad?: (data: FireRiskData[]) => void;
  className?: string;
  height?: string;
  showControls?: boolean;
  showFireHazardLayer?: boolean;
}

export interface FireRiskMapClientProps {
  initialCenter: MapCenter;
  initialZoom: number;
  bounds: MapBounds;
  fireHazardLayers: FireHazardLayer[];
  onMapClick: (lat: number, lng: number) => void;
  onBoundsChange: (bounds: MapBounds) => void;
  onLoadingStateChange: (loading: boolean) => void;
  onError: (errorMessage: string) => void;
}

export interface FireRiskMapControlsProps {
  fireHazardLayers: FireHazardLayer[];
  activeLayers: FireHazardLayer[];
  onLayerToggle: (layerId: string, isActive: boolean) => void;
  isLoading: boolean;
  error: string | null;
}

export interface MapClickEvent {
  latlng: {
    lat: number;
    lng: number;
  };
}

export interface MapBoundsEvent {
  target: {
    getBounds: () => {
      getNorth: () => number;
      getSouth: () => number;
      getEast: () => number;
      getWest: () => number;
    };
  };
} 