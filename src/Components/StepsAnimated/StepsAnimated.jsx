import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCog, FaCheckCircle, FaClipboardList } from "react-icons/fa";

const StepsAnimated = () => {
  const [step, setStep] = useState(1);
  const [isMovingForward, setIsMovingForward] = useState(true);

  const handleContinueClick = () => {
    if (step < 3) {
      setIsMovingForward(true);
      setStep(step + 1);
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setIsMovingForward(false);
      setStep(step - 1);
    }
  };

  // Animation variants for Framer Motion
  const progressWidthVariants = {
    1: { width: "0%" },
    2: { width: "50%" },
    3: { width: "100%" },
  };

  const getCircleStyles = (index) => {
    if (step > index) {
      return "bg-[#191C18] border-2 border-[#CCE867] text-white shadow-3d-button"; // Completed: dark background, green border, white icon
    } else {
      return "bg-[#191C18] border-2 border-[#333533] text-[#4B4E4A] shadow-3d-button"; // Incomplete: dark background, grey border, grey icon
    }
  };

  const steps = [
    { icon: <FaCog />, label: "Content" },
    { icon: <FaClipboardList />, label: "Options" },
    { icon: <FaCheckCircle />, label: "Complete" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-black text-white">
      <div className="relative flex items-center justify-between w-full max-w-lg">
        {/* Connecting Line */}
        <div className="absolute flex items-center top-1/2 left-0 right-0 h-2 bg-[#191C18] transform -translate-y-1/2">
          <motion.div
            className="h-0.5 bg-[#CCE867]"
            initial={{ width: "0%" }}
            animate={progressWidthVariants[step]}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: isMovingForward ? 0 : 0.5, // Delay for line when moving backward
            }}
          ></motion.div>
        </div>
        {/* Icons */}
        {steps.map((stepItem, index) => (
          <motion.div
            key={index}
            className={`relative flex items-center justify-center w-12 h-12 rounded-full ${getCircleStyles(
              index
            )} z-10`}
            initial={{ scale: 1.2 }}
            animate={{
              borderColor: step > index ? "#CCE867" : "#333533",
              color: step > index ? "#FFFFFF" : "#4B4E4A",
              background:
                step > index
                  ? "linear-gradient(145deg, #2A2C28, #1E201D)"
                  : "linear-gradient(145deg, #1E201D, #0F0F0F)",

              boxShadow:
                step > index
                  ? "inset 2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.05)"
                  : "inset 2px 2px 5px rgba(0, 0, 0, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.05)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: isMovingForward && step > index ? 0.5 : 0, // Delay for circle when moving forward
            }}
          >
            {stepItem.icon}
          </motion.div>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex items-center justify-center py-10 mt-8 gap-4">
        {step > 1 && (
          <motion.button
            className="bg-[#2B2E2A] rounded-full font-semibold text-gray-300 h-10 w-24 flex items-center justify-center"
            onClick={handleBackClick}
          >
            Back
          </motion.button>
        )}
        <motion.button
          className="bg-[#CCE867] rounded-full font-semibold text-black h-10 flex items-center justify-center"
          style={{
            width: step === 1 ? "384px" : "300px", // Large at first, then smaller
          }}
          animate={{
            width: step === 1 ? "384px" : "300px", // Animated width change
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={handleContinueClick}
        >
          {step === 3 ? "Finish" : "Next"}
        </motion.button>
      </div>
    </div>
  );
};

export default StepsAnimated;
