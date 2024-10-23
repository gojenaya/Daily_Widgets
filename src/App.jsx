import { useState } from "react";
import MapZap from "./Widgets/MapZap/MapZap";
import CheerChomp from "./Widgets/CheerChomp/CheerChomp";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" ">
      <MapZap />
    </div>
  );
}

export default App;
