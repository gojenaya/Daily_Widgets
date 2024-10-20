import React from "react";
import worldmap from "../../assets/MemoryMap/WorldMap.png";
import pin from "../../assets/MemoryMap/pin.svg";

const MemoryMap = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden ">
      <div className="w-full h-screen flex items-center justify-center">
        Container for the map
        <div className="relative w-[40%] h-[55%] bg-map-background rounded-3xl overflow-hidden">
          {/* Background map image */}
          <img
            src={worldmap}
            alt="World Map"
            className="absolute inset-0 w-full h-full object-contain opacity-80"
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

          {/* Draggable Pin */}
          <div className="absolute bottom-4 left-4 cursor-pointer">
            <div className="flex items-center">
              <img src={pin} alt="Draggable Pin" className="w-8 h-8" />
              <span className="text-white ml-2">Drop a pin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryMap;
