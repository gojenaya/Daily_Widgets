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

  // Close dropdown on clicking outside the input or dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch city and country suggestions from the Mapbox API
  const fetchCities = async (search) => {
    if (!search) {
      setCities([]);
      return;
    }

    try {
      // Fetch cities from Mapbox API with a limit of 20 results
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          search
        )}.json?access_token=${mapboxgl.accessToken}&limit=20&types=place`
      );
      const data = await response.json();

      // Filter the results to show cities with both city and country
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
        // Only show cities that start with the search term, case-insensitive
        .filter((place) =>
          place.city.toLowerCase().startsWith(search.toLowerCase())
        )
        // Sort cities alphabetically by city name
        .sort((a, b) => a.city.localeCompare(b.city));

      setCities(filteredCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Handle input change
  useEffect(() => {
    if (searchTerm) {
      fetchCities(searchTerm); // Fetch cities when typing
      setDropdownVisible(true); // Show dropdown when typing
    } else {
      setCities([]);
      setDropdownVisible(false); // Hide dropdown when input is cleared
    }
  }, [searchTerm]);

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(`${city.city}, ${city.country}`); // Show selected city and country in input
    setDropdownVisible(false); // Hide the dropdown after selection
  };

  // Handle adding city pin
  const handleAddPin = () => {
    if (selectedCity) {
      onSelectCity(selectedCity); // Pass the city and country data to parent component
      onClose(); // Close the modal after the city is added
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className="bg-gray-100 rounded-lg shadow-lg p-6 w-96 relative"
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
            setSelectedCity(null); // Reset selected city if typing continues
          }}
          ref={inputRef}
          className="border border-gray-300 rounded p-2 w-full mb-2 bg-gray-200 text-gray-800"
          placeholder="Enter city name..."
        />
        {/* Dropdown for city list */}
        {dropdownVisible && cities.length > 0 && (
          <ul
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

        {/* Show 'Add' button if a city is selected */}
        {selectedCity && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleAddPin}
          >
            Add {selectedCity.city}
          </button>
        )}

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CitySelectionModal;
