import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContainer from "./components/mainContainer/mainContainer";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <div className={`App ${theme}`}>
      <Sidebar setTheme={setTheme} />
      <div>
        <Header />
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
