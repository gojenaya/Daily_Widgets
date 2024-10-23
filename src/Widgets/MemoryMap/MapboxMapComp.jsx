import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import LiquidMorphToggle from "./LiquidMorphToggle";
import MapContainer from "./MapContainer";
import AddPinButton from "./AddPinButton";
import CitySelectionModal from "./CitySelectionModal";

const initialLocations = [
  { lng: -74.006, lat: 40.7128, city: "New York", country: "United States" },
  { lng: 72.8777, lat: 19.076, city: "Mumbai", country: "India" },
  { lng: -79.3832, lat: 43.6532, city: "Toronto", country: "Canada" },
  { lng: -81.5158, lat: 27.6648, city: "Florida", country: "United States" },
  { lng: 2.3522, lat: 48.8566, city: "Paris", country: "France" },
];

const MapboxMapComp = () => {
  const [isGlobeView, setIsGlobeView] = useState(false);
  const [locations, setLocations] = useState(initialLocations);
  const [centerOnLocation, setCenterOnLocation] = useState(null); // Track location to center on
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserAdded, setIsUserAdded] = useState(false); // New state to track if a pin was added by the user

  // Add global overflow hidden on mount and cleanup on unmount
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, []);

  // Function to add a new location pin and center on it if in globe view
  const handleAddLocation = (city) => {
    const [lng, lat] = city.center;
    const newLocation = { lng, lat, city: city.city, country: city.country };
    setLocations((prevLocations) => [...prevLocations, newLocation]);
    setIsUserAdded(true); // Set flag to true when a new pin is added by the user
    if (isGlobeView) {
      setCenterOnLocation({ lng, lat }); // Center on the new pin if in globe view
    }
  };

  // Function to handle the map projection transition
  const handleMapTransition = () => {
    setIsGlobeView(!isGlobeView);
  };
  //
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden fixed inset-0">
      {/* Widget Container */}
      <div className="aspect-[16/9] w-full max-w-[700px] bg-map-background rounded-3xl relative flex flex-col items-center justify-center mx-auto overflow-hidden">
        {/* Map Container */}
        <MapContainer
          isGlobeView={isGlobeView}
          locations={locations}
          centerOnLocation={centerOnLocation}
          isUserAdded={isUserAdded} // Pass the user-added flag to the map container
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
