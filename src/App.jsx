import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContainer from "./components/mainContainer/mainContainer";
import Modal from "./components/modals";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <div className={`App ${theme}`}>
      <Sidebar setTheme={setTheme} />
      <div className="main">
        <Header />
        <MainContainer />
      </div>
      <Modal />
    </div>
  );
}

export default App;
