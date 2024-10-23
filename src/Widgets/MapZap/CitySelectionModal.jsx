import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmFnb2plIiwiYSI6ImNtMmQzNDVzdzBpZHUya3M3OTNxdjhwN2YifQ.svkFa3kKIzHmZ9GX0_p2fg";

const CitySelectionModal = ({ onClose, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close modal and dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) // If clicked outside the modal
      ) {
        onClose(); // Close the modal
      } else if (
        inputRef.current &&
        !inputRef.current.contains(event.target) && // If clicked outside the input field
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) // And outside the dropdown
      ) {
        setDropdownVisible(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Fetch city and country suggestions from the Mapbox API
  const fetchCities = async (search) => {
    if (!search) {
      setCities([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          search
        )}.json?access_token=${mapboxgl.accessToken}&limit=20&types=place`
      );
      const data = await response.json();

      const filteredCities = data.features
        .map((feature) => {
          const placeNameParts = feature.place_name.split(", ");
          const city = placeNameParts[0];
          const country = placeNameParts[placeNameParts.length - 1];
          return {
            id: feature.id,
            city,
            country,
            center: feature.center,
          };
        })
        .filter((place) =>
          place.city.toLowerCase().startsWith(search.toLowerCase())
        )
        .sort((a, b) => a.city.localeCompare(b.city));

      setCities(filteredCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCities(searchTerm);
      setDropdownVisible(true);
    } else {
      setCities([]);
      setDropdownVisible(false);
    }
  }, [searchTerm]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(`${city.city}, ${city.country}`);
    setDropdownVisible(false);
  };

  const handleAddPin = () => {
    if (selectedCity) {
      onSelectCity(selectedCity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className="bg-gray-100 rounded-2xl shadow-lg p-6 w-96 relative"
        ref={modalRef}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          What’s Your Next Pin?
        </h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedCity(null);
          }}
          ref={inputRef}
          className="border border-gray-300 rounded p-2 w-full mb-2 bg-gray-200 text-gray-800"
          placeholder="Enter city name..."
        />
        {dropdownVisible && cities.length > 0 && (
          <ul
            ref={dropdownRef}
            className="absolute w-full max-h-40 bg-gray-200 border border-gray-300 rounded mt-1 overflow-y-auto z-10 custom-scrollbar"
            style={{
              width: inputRef.current ? inputRef.current.offsetWidth : "100%",
            }}
          >
            {cities.map((city) => (
              <li
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className="p-2 cursor-pointer hover:bg-gray-300 text-gray-800"
              >
                {city.city}, {city.country}
              </li>
            ))}
          </ul>
        )}

        {/* Flexbox for buttons */}
        <div className="flex justify-between gap-5 mt-4 w-full z-50">
          <button
            className={`flex-1 px-4 py-2 border-2 rounded-lg ${
              selectedCity
                ? "bg-map-blue text-white "
                : "bg-gray-100 border-map-lightgrey text-map-lightgrey cursor-not-allowed"
            }`}
            onClick={handleAddPin}
            disabled={!selectedCity} // Disable if no city is selected
          >
            Add Pin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitySelectionModal;
