import { useState } from "react";

import "./App.css";
import MapboxMapComp from "./Widgets/MemoryMap/MapboxMapComp";
import CardScreen from "./Widgets/MemoryMap/CardScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center  overflow-hidden ">
      <MapboxMapComp />
    </div>
  );
}

export default App;
