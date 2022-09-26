import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Device from "./components/Device";
import PickGame from "./components/PickGame";
import ViewDevice from "./components/ViewDevice";
import ControllerDevice from "./components/ControllerDevice";
import SudokuV from "./components/sudoku/SudokuV";
import RPS_V from "./components/RockPaperScissors/RPS_V";


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/device" element={<Device />}/>
      <Route path="/game" element={<PickGame />}/>
      <Route path="/view" element={<ViewDevice />}/>
      <Route path="/controller" element={<ControllerDevice />}/>
      <Route path="/sudoku" element={<SudokuV />}/>
      <Route path="/RockPaperScissors" element={<RPS_V />}/>
    </Routes>
  </BrowserRouter>
);

export default App;