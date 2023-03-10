import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContainer from "./components/mainContainer/mainContainer";
import Modal from "./components/modals";
import { useDispatch } from "react-redux";

function App() {
  const [theme, setTheme] = useState("dark");
  const dispatch = useDispatch();

  return (
    <div className={`App ${theme}`}>
      <Sidebar setTheme={setTheme} />
      <div className="main">
        <Header setTheme={setTheme} />
        <MainContainer />
      </div>
      <Modal />
    </div>
  );
}

export default App;
