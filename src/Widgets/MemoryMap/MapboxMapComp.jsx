import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import LiquidMorphToggle from "./LiquidMorphToggle";
import MapContainer from "./MapContainer";
import AddPinButton from "./AddPinButton";
import CitySelectionModal from "./CitySelectionModal";

const initialLocations = [
  { lng: -74.006, lat: 40.7128, city: "New York" }, // New York
  { lng: 72.8777, lat: 19.076, city: "Mumbai" }, // Mumbai
  { lng: -79.3832, lat: 43.6532, city: "Toronto" }, // Toronto
  { lng: -81.5158, lat: 27.6648, city: "Florida" }, // Florida
  { lng: 2.3522, lat: 48.8566, city: "Paris" }, // Paris
];

const MapboxMapComp = () => {
  const [isGlobeView, setIsGlobeView] = useState(false);
  const [locations, setLocations] = useState(initialLocations);
  const [centerOnLocation, setCenterOnLocation] = useState(null); // Track location to center on
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new location pin and center on it if in globe view
  const handleAddLocation = (city) => {
    const [lng, lat] = city.center;
    const newLocation = { lng, lat, city: city.city, country: city.country }; // Include country
    setLocations((prevLocations) => [...prevLocations, newLocation]);
    if (isGlobeView) {
      setCenterOnLocation({ lng, lat }); // Center on the new pin if in globe view
    }
  };

  // Function to handle the map projection transition
  const handleMapTransition = () => {
    setIsGlobeView(!isGlobeView);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <div className="w-[50%] h-[75%] flex flex-col items-center justify-center bg-map-background rounded-3xl relative overflow-hidden">
        {/* Map Container */}
        <MapContainer
          isGlobeView={isGlobeView}
          locations={locations}
          centerOnLocation={centerOnLocation}
        />

        {/* Add Pin Button */}
        <AddPinButton onClick={() => setIsModalOpen(true)} />

        {/* City Selection Modal */}
        {isModalOpen && (
          <CitySelectionModal
            onClose={() => setIsModalOpen(false)}
            onSelectCity={handleAddLocation}
          />
        )}

        {/* Liquid Morph Toggle */}
        <div className="absolute top-2 flex items-center space-x-4">
          <LiquidMorphToggle
            isGlobeView={isGlobeView}
            setIsGlobeView={handleMapTransition}
          />
        </div>
      </div>
    </div>
  );
};

export default MapboxMapComp;
