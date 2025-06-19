# Fire Risk Map Component

A comprehensive React component for displaying interactive fire risk maps specifically designed for California Fire Defense Landscaping applications.

## Features

- **SSR-Safe**: Properly handles server-side rendering with dynamic imports
- **California-Centric**: Pre-configured with California bounds and center coordinates
- **Fire Hazard Layers**: Support for WMS, WFS, tile, and GeoJSON layers
- **Interactive Controls**: Layer toggles, loading states, and error handling
- **TypeScript**: Fully typed with comprehensive interfaces
- **Error Boundaries**: Graceful error handling with retry functionality
- **Responsive Design**: Mobile-friendly with Tailwind CSS styling

## Components

### FireRiskMap
The main component that orchestrates the entire map functionality.

```tsx
import { FireRiskMap } from '@/components/fire-risk-map';

<FireRiskMap
  initialCenter={{ lat: 36.7783, lng: -119.4179 }}
  initialZoom={6}
  fireHazardLayers={layers}
  onMapClick={(lat, lng) => console.log(lat, lng)}
  onBoundsChange={(bounds) => console.log(bounds)}
  height="600px"
  showControls={true}
/>
```

### FireRiskMapClient
The client-side map component using React-Leaflet.

### FireRiskMapControls
Interactive controls for layer management and map information.

### FireRiskMapErrorBoundary
Error boundary component for graceful error handling.

### FireRiskMapLoading
Loading state component with spinner and messaging.

## Types

### FireHazardLayer
```tsx
interface FireHazardLayer {
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
```

### MapBounds
```tsx
interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
```

### MapCenter
```tsx
interface MapCenter {
  lat: number;
  lng: number;
}
```

## Usage Examples

### Basic Usage
```tsx
import { FireRiskMap } from '@/components/fire-risk-map';

function MyComponent() {
  const fireHazardLayers = [
    {
      id: 'cal-fire-hazard',
      name: 'Fire Hazard Severity Zones',
      description: 'CAL FIRE Fire Hazard Severity Zones',
      url: 'https://gis.fire.ca.gov/arcgis/rest/services/FRAP/FireHazardSeverityZones/MapServer/WMSServer',
      type: 'wms' as const,
      opacity: 0.7,
      visible: true,
      attribution: 'CAL FIRE'
    }
  ];

  return (
    <FireRiskMap
      fireHazardLayers={fireHazardLayers}
      onMapClick={(lat, lng) => {
        console.log(`Clicked at: ${lat}, ${lng}`);
      }}
    />
  );
}
```

### With Custom Event Handlers
```tsx
function MyComponent() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentBounds, setCurrentBounds] = useState(null);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    // Fetch fire risk data for this location
    fetchFireRiskData(lat, lng);
  };

  const handleBoundsChange = (bounds: MapBounds) => {
    setCurrentBounds(bounds);
    // Update visible data based on new bounds
    updateVisibleData(bounds);
  };

  return (
    <FireRiskMap
      fireHazardLayers={layers}
      onMapClick={handleMapClick}
      onBoundsChange={handleBoundsChange}
      showControls={true}
      height="800px"
    />
  );
}
```

## Fire Defense Zones

The component is designed with California's fire defense zones in mind:

- **Zone 0 (0-5 feet)**: Immediate area around structures
- **Zone 1 (5-30 feet)**: Lean, clean, and green landscaping
- **Zone 2 (30-100+ feet)**: Reduced fuel density

## Data Sources

The component is prepared to integrate with:

- **CAL FIRE**: Fire Hazard Severity Zones
- **USGS**: Wildfire activity and perimeters
- **Custom APIs**: Your own fire risk data endpoints

## Styling

The component uses Tailwind CSS classes and can be customized with:

- `className` prop for additional CSS classes
- `height` prop for custom map height
- Custom styling through the `style` prop in layer definitions

## Error Handling

The component includes comprehensive error handling:

- Network errors for tile loading
- Invalid coordinate errors
- Layer loading failures
- Graceful fallbacks with retry options

## Performance Considerations

- Dynamic imports prevent SSR issues
- Layer opacity controls for performance
- Proper cleanup of event listeners
- Efficient re-rendering with React.memo patterns

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Dependencies

- React 18+
- Next.js 14+
- React-Leaflet
- Leaflet.js
- TypeScript
- Tailwind CSS

## Development

To extend the component:

1. Add new layer types in `renderFireHazardLayer`
2. Extend TypeScript interfaces in `types.ts`
3. Add new controls in `FireRiskMapControls`
4. Implement custom event handlers as needed

## License

This component is part of the California Fire Defense Landscaping project. 