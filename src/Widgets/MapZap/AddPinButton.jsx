import React from "react";
import { PiMapPinPlus } from "react-icons/pi";

const AddPinButton = ({ onClick }) => {
  return (
    <button
      className="absolute bottom-5 left-5 p-3 rounded-full text-map-lightgrey bg-map-darkgrey shadow-lg focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-125 hover:bg-map-blue hover:text-white"
      onClick={onClick}
    >
      <PiMapPinPlus size={24} />
    </button>
  );
};

export default AddPinButton;
