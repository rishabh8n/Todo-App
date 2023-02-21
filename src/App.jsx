import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainContainer from "./components/mainContainer/mainContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <MainContainer />
    </div>
  );
}

export default App;
