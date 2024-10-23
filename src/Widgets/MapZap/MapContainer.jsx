import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./mapWidget.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmFnb2plIiwiYSI6ImNtMmQzNDVzdzBpZHUya3M3OTNxdjhwN2YifQ.svkFa3kKIzHmZ9GX0_p2fg";

const MapContainer = ({
  isGlobeView,
  locations,
  centerOnLocation,
  isUserAdded,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Map settings based on the selected projection
    const mapSettings = isGlobeView
      ? { center: [60, 20], zoom: 1 }
      : { center: [0, 40], zoom: 0.04 };

    // Initialize the Mapbox map only once
    if (!mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/nagoje/cm2j8nyxc006d01qs71x1cz2w",
        ...mapSettings,
        interactive: true,
        attributionControl: false,
        projection: isGlobeView ? "globe" : "mercator", // Toggle projection type
      });

      mapRef.current = map;

      // Adjust the boundary line thickness once the map style is loaded
      map.on("style.load", () => {
        map.setPaintProperty("admin-0-boundary", "line-width", 0.25); // Thinner country borders
        map.setPaintProperty("admin-1-boundary", "line-width", 0.1); // Thinner regional borders
      });
    }

    // Set the correct projection and center dynamically without reloading the map
    if (mapRef.current) {
      const map = mapRef.current;
      map.setProjection(isGlobeView ? "globe" : "mercator");
      map.flyTo(mapSettings); // Smoothly pan to the new center and zoom level
    }
  }, [isGlobeView]);

  // Add markers dynamically based on locations array
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Clear existing markers before adding new ones
      const markers = document.querySelectorAll(".custom-marker");
      markers.forEach((marker) => marker.remove());

      // Add new markers for the specified locations
      locations.forEach((location) => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker";
        markerElement.style.width = "7px"; // Normal dot width
        markerElement.style.height = "7px"; // Normal dot height
        markerElement.style.backgroundColor = "#FF5733"; // Custom color for the dot
        markerElement.style.borderRadius = "50%"; // Make it a circle
        markerElement.style.boxShadow = "0 0 2px rgba(0, 0, 0, 0.3)"; // Optional: Add shadow for visibility

        // Create the marker
        const marker = new mapboxgl.Marker({
          element: markerElement,
          draggable: false,
        })
          .setLngLat([location.lng, location.lat])
          .addTo(map);

        // Only show the popup and enlarge pin if the pin was added by the user
        if (isUserAdded && location === locations[locations.length - 1]) {
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: "custom-popup fade-out", // Custom class to style the bubble with fade-out effect
          })
            .setLngLat([location.lng, location.lat])
            .setHTML(`<p>${location.city}, ${location.country}</p>`) // Display only city and country
            .addTo(map);

          // Animate the marker to enlarge temporarily
          markerElement.style.width = "12px"; // Larger dot width
          markerElement.style.height = "12px"; // Larger dot height

          // After 3 seconds, shrink the marker and let the popup fade out
          setTimeout(() => {
            markerElement.style.width = "7px"; // Return to normal size
            markerElement.style.height = "7px";
          }, 3000);
        }

        // Add hover effect for the marker to enlarge and show the popup on hover
        let hoverPopup = null;
        markerElement.addEventListener("mouseenter", () => {
          markerElement.style.width = "12px"; // Enlarge on hover
          markerElement.style.height = "12px";
          markerElement.style.boxShadow = "0 0 10px rgba(255, 87, 51, 0.8)"; // Add glow

          hoverPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: "custom-popup", // Custom class to style the bubble
          })
            .setLngLat([location.lng, location.lat])
            .setHTML(`<p>${location.city}, ${location.country}</p>`) // Display city and country
            .addTo(map);
        });

        // Remove popup and reset size on mouse leave
        markerElement.addEventListener("mouseleave", () => {
          markerElement.style.width = "7px"; // Shrink on leave
          markerElement.style.height = "7px";
          markerElement.style.boxShadow = "0 0 2px rgba(0, 0, 0, 0.3)"; // Remove glow

          if (hoverPopup) {
            hoverPopup.remove(); // Hide popup
            hoverPopup = null; // Clear reference
          }
        });
      });

      // Center the globe on the new location if globe view is active
      if (isGlobeView && centerOnLocation) {
        map.flyTo({
          center: [centerOnLocation.lng, centerOnLocation.lat],
          zoom: 1.5, // Adjust zoom to fit the globe view nicely
          speed: 1.2, // Smooth the animation
          curve: 1, // Curve makes the movement smooth
        });
      }
    }
  }, [locations, isGlobeView, centerOnLocation, isUserAdded]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
      className={`${isGlobeView ? "" : "top-8"}`}
    />
  );
};

export default MapContainer;
