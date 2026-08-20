"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const TERRAIN_SOURCE = "terrain-dem";

export default function MapView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [is3D, setIs3D] = useState(false);
  const [controlContainer, setControlContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    mapRef.current = new Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      bounds: COUNTIES_BOUNDS,
      fitBoundsOptions: { padding: 20 },
    });

    mapRef.current.addControl(new NavigationControl(), "top-right");
    setControlContainer(
      containerRef.current.querySelector(".maplibregl-ctrl-top-right"),
    );

    mapRef.current.on("load", () => {
      mapRef.current?.setPaintProperty("water", "fill-color", "#a0c8f0");
      mapRef.current?.setPaintProperty("waterway", "line-color", "#a0c8f0");
      // Placeholder tint so forest reads distinctly from open ground until
      // real fuel/vegetation data replaces this generic OSM landcover layer.
      mapRef.current?.setPaintProperty("landcover_wood", "fill-color", "#cadfc2");

      // Terrain: slope/aspect are directly relevant to fire behavior, so
      // elevation context is worth having even before real fuels data is in.
      // AWS's public terrarium DEM tiles — free, no key, no rate limit.
      // Hillshade stays on always (useful flat too); 3D extrusion + camera
      // pitch are toggled together by the button below.
      const demConfig = {
        type: "raster-dem" as const,
        tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
        tileSize: 256,
        encoding: "terrarium" as const,
        maxzoom: 15,
      };
      // Separate sources for hillshade (2D shading) vs. terrain (3D mesh) —
      // sharing one hurts rendering quality for both.
      mapRef.current?.addSource("hillshade-dem", demConfig);
      mapRef.current?.addSource(TERRAIN_SOURCE, demConfig);
      mapRef.current?.addLayer(
        { id: "hillshade", type: "hillshade", source: "hillshade-dem" },
        "water",
      );
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  const toggle3D = () => {
    const map = mapRef.current;
    if (!map) return;

    if (is3D) {
      map.setTerrain(null);
      map.easeTo({ pitch: 0, duration: 800 });
    } else {
      map.setTerrain({ source: TERRAIN_SOURCE, exaggeration: 1.2 });
      map.easeTo({ pitch: 60, duration: 800 });
    }
    setIs3D(!is3D);
  };

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      {controlContainer &&
        createPortal(
          <div className="maplibregl-ctrl maplibregl-ctrl-group">
            <button
              type="button"
              className={is3D ? "maplibregl-ctrl-terrain-enabled" : "maplibregl-ctrl-terrain"}
              title={is3D ? "Disable terrain" : "Enable terrain"}
              onClick={toggle3D}
            >
              <span className="maplibregl-ctrl-icon" aria-hidden="true" />
            </button>
          </div>,
          controlContainer,
        )}
    </>
  );
}
