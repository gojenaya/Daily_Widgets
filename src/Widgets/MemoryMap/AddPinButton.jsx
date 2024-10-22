import React from "react";
import { PiMapPinPlus } from "react-icons/pi";

const AddPinButton = ({ onClick }) => {
  return (
    <button
      className="absolute bottom-4 left-4 p-3 text-white rounded-full shadow-lg focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-110"
      onClick={onClick}
    >
      <PiMapPinPlus size={24} />
    </button>
  );
};

export default AddPinButton;
