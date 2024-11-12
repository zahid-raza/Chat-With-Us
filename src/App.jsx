import { useState } from "react";

import "./App.css";
import ChatWidget from "./Widget/ChatWidget";

function App() {
  const [count, setCount] = useState(0);

  return <ChatWidget></ChatWidget>;
}

export default App;
