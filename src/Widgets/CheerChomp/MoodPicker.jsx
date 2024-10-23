import React from "react";

const MoodPicker = ({ mood, setMood }) => {
  return (
    <div className="flex items-center space-x-4 mt-4">
      <button
        className={`${
          mood === "happy" ? "bg-green-500" : "bg-gray-200"
        } w-10 h-10 rounded-full`}
        onClick={() => setMood("happy")}
      >
        😊
      </button>
      <button
        className={`${
          mood === "sad" ? "bg-red-500" : "bg-gray-200"
        } w-10 h-10 rounded-full`}
        onClick={() => setMood("sad")}
      >
        😢
      </button>
      <button
        className={`${
          mood === "angry" ? "bg-yellow-500" : "bg-gray-200"
        } w-10 h-10 rounded-full`}
        onClick={() => setMood("angry")}
      >
        😠
      </button>
    </div>
  );
};

export default MoodPicker;
