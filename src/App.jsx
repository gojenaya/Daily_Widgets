import { useState } from "react";

import "./App.css";
import MemoryMap from "./Widgets/MemoryMap/MemoryMap";
import MapboxMapComp from "./Widgets/MemoryMap/MapboxMapComp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <MapboxMapComp />
    </div>
  );
}

export default App;
