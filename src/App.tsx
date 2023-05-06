import React from "react";
import CalendarReactComponent from "./components/Calendar/CalenderReactCalendar";
import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/mainPage/Nav";
import MainLAyout from "./components/mainPage/MainLayout";
// import Checkout from "./components/Calendar/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<MainLAyout />} />
          <Route path="/book" element={<CalendarReactComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
