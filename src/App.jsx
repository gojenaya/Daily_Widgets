import { useState } from "react";
import MapZap from "./Widgets/MapZap/MapZap";
import CheerChomp from "./Widgets/CheerChomp/CheerChomp";
import StepsAnimated from "./Components/StepsAnimated/StepsAnimated";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" ">
      <StepsAnimated />
    </div>
  );
}

export default App;
