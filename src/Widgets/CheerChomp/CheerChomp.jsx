import React from "react";
import MoodPicker from "./MoodPicker";

const CheerChomp = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden fixed inset-0">
      {/* Widget Container */}
      <div className="aspect-[16/9] w-full max-w-[700px] bg-map-background rounded-3xl relative flex flex-col items-center justify-center mx-auto overflow-hidden">
        {/* Mood Picker */}
        <div className="flex items-center space-x-4 mt-4">
          <MoodPicker mood={mood} setMood={setMood} />
        </div>
      </div>
    </div>
  );
};

export default CheerChomp;
