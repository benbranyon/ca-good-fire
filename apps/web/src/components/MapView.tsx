"use client";

import { useEffect, useRef } from "react";
import { Map, NavigationControl, setWorkerUrl } from "maplibre-gl";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Turbopack mishandles maplibre-gl's worker (it hashes it into an asset
// without its sibling maplibre-gl-shared.mjs, so the worker fails on its
// first import and no vector tiles ever load). Both files are copied into
// public/ unbundled and loaded from there instead.
// https://github.com/vercel/next.js/issues/86495
setWorkerUrl("/maplibre-gl-worker.mjs");

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
      style: "https://tiles.openfreemap.org/styles/positron",
      bounds: COUNTIES_BOUNDS,
      fitBoundsOptions: { padding: 20 },
    });

    mapRef.current.addControl(new NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      mapRef.current?.setPaintProperty("water", "fill-color", "#a0c8f0");
      mapRef.current?.setPaintProperty("waterway", "line-color", "#a0c8f0");
      // Placeholder tint so forest reads distinctly from open ground until
      // real fuel/vegetation data replaces this generic OSM landcover layer.
      mapRef.current?.setPaintProperty("landcover_wood", "fill-color", "#cadfc2");
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
