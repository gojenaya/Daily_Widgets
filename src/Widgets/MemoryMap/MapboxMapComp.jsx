import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import pin from "../../assets/MemoryMap/pin.svg";
import { motion } from "framer-motion";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmFnb2plIiwiYSI6ImNtMmQzNDVzdzBpZHUya3M3OTNxdjhwN2YifQ.svkFa3kKIzHmZ9GX0_p2fg";

const MapboxMapComp = () => {
  const mapContainerRef = useRef(null);
  const dragConstraintsRef = useRef(null);
  const mapRef = useRef(null);

  // State to hold the current location info (city, country)
  const [currentLocation, setCurrentLocation] = useState({
    city: "",
    country: "",
  });
  const [isDragging, setIsDragging] = useState(false); // State to manage drag state

  useEffect(() => {
    // Initialize the Mapbox map with zoom and scroll interactions disabled
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/nagoje/cm2d8efs600yt01r23qdibqrk", // You can change the style if you prefer
      center: [13, 30], // Center on the world
      zoom: 0.03, // Zoom out to see all continents
      interactive: false, // Disable all interactions (zoom, drag, etc.)
      attributionControl: false,
      projection: "mercator",
    });

    mapRef.current = map;

    // Add country borders layer
    map.on("load", () => {
      // Add a line layer for country borders
      map.addLayer({
        id: "country-borders",
        type: "line",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8", // Use Mapbox's street vector data
        },
        "source-layer": "admin", // Administrative boundaries
        paint: {
          "line-color": "#191817", // White border color (adjust as needed)
          "line-width": 0.5, // Adjust border width for visibility
        },
        filter: ["==", "admin_level", 0], // Filter for country borders (admin level 0)
      });
    });

    return () => map.remove(); // Cleanup map when component unmounts
  }, []);

  const handleDrag = (event, info) => {
    if (mapRef.current) {
      // Convert the screen coordinates to geographical coordinates (lng, lat)
      const { x, y } = info.point; // Get the screen coordinates from drag
      const lngLat = mapRef.current.unproject([x, y]); // Convert to geographic coordinates
      setCurrentLocation({ lng: lngLat.lng, lat: lngLat.lat }); // Update the location state
      console.log(lngLat);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="w-[48%] h-[63%]  flex items-center justify-center bg-map-background  rounded-3xl">
        <div className="relative w-[83%] h-[100%]  " ref={dragConstraintsRef}>
          {/* Mapbox GL container */}
          <div
            ref={mapContainerRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Randomly Placed Pins */}
          <div className="absolute top-[30%] left-[40%]">
            <img src={pin} alt="Pin" className="w-6 h-6" />
          </div>
          <div className="absolute top-[50%] left-[20%]">
            <img src={pin} alt="Pin" className="w-6 h-6" />
          </div>
          <div className="absolute top-[70%] left-[60%]">
            <img src={pin} alt="Pin" className="w-6 h-6" />
          </div>
          <div className="absolute top-[25%] left-[70%]">
            <img src={pin} alt="Pin" className="w-6 h-6" />
          </div>

          {/* Draggable Pin (Static for now) */}

          <div className="absolute bottom-4 -left-6 flex items-center">
            <motion.div
              className={`cursor-pointer ${
                isDragging
                  ? "scale-125 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                  : ""
              }`}
              drag
              dragConstraints={dragConstraintsRef}
              dragMomentum={false}
              onDrag={handleDrag}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              style={{ touchAction: "none" }}
            >
              <img src={pin} alt="Draggable Pin" className="w-8 h-8" />{" "}
            </motion.div>
            <span className="text-white ml-2">Drop a pin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapboxMapComp;
