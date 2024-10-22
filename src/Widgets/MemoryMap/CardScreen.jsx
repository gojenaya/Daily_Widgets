import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInOut = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const CardScreen = () => {
  const [isCard1, setIsCard1] = useState(true);

  const handleClick = () => {
    setIsCard1(!isCard1);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <AnimatePresence mode="wait">
        {isCard1 ? (
          <motion.div
            key="card1"
            className="card"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInOut}
            style={{
              width: "200px",
              height: "150px",
              backgroundColor: "#ff9999",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            Card 1 Content
          </motion.div>
        ) : (
          <motion.div
            key="card2"
            className="card"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInOut}
            style={{
              width: "200px",
              height: "150px",
              backgroundColor: "#9999ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            Card 2 Content
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="card"
        initial="hidden"
        animate="visible"
        variants={fadeInOut}
        style={{
          width: "200px",
          height: "150px",
          backgroundColor: "#e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Static Card Content
      </motion.div>
    </div>
  );
};

export default CardScreen;
