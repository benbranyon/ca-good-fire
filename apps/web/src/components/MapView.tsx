"use client";

import { useEffect, useRef } from "react";
import { Map, NavigationControl } from "maplibre-gl";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Rough bounding box covering Calaveras and Tuolumne counties, CA.
const COUNTIES_BOUNDS: [[number, number], [number, number]] = [
  [-120.95, 37.85],
  [-119.85, 38.45],
];

export default function MapView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapRef.current = new Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap contributors",
          },
        },
        layers: [{ id: "osm", type: "raster", source: "osm" }],
      },
      bounds: COUNTIES_BOUNDS,
      fitBoundsOptions: { padding: 20 },
    });

    mapRef.current.addControl(new NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
