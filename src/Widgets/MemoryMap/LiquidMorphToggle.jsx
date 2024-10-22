import React from "react";
import { motion } from "framer-motion";

const LiquidMorphToggle = ({ isGlobeView, setIsGlobeView }) => {
  // Toggle function
  const toggleView = () => {
    setIsGlobeView(!isGlobeView);
  };

  return (
    <div
      className="relative flex items-center justify-between w-[150px] h-[40px] bg-white p-1 rounded-full"
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for some depth
      }}
    >
      {/* Animated background for the selected option */}
      <motion.div
        className="absolute z-0"
        style={{
          height: "80%",
          width: "50%",
          borderRadius: "25px", // Make sure the background is fully rounded
        }}
        animate={{
          x: isGlobeView ? 65 : 0, // Moves left or right based on the toggle state
          backgroundColor: "#8C8C8D", // Change the background color based on state
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 15,
        }}
      />

      {/* Map View Button */}
      <div
        className={`relative z-10 w-1/2 text-center text-sm cursor-pointer transition-all duration-200 ${
          isGlobeView ? "text-gray-500" : "text-white"
        }`}
        onClick={() => setIsGlobeView(false)}
      >
        Map
      </div>

      {/* Globe View Button */}
      <div
        className={`relative z-10 w-1/2 text-center text-sm cursor-pointer transition-all duration-200 ${
          isGlobeView ? "text-white" : "text-gray-500"
        }`}
        onClick={() => setIsGlobeView(true)}
      >
        Globe
      </div>
    </div>
  );
};

export default LiquidMorphToggle;
