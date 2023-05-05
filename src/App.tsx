import React from "react";
import CalendarReactComponent from "./components/Calendar/CalenderReactCalendar";
import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/mainPage/HeroSection";
import Nav from "./components/mainPage/Nav";
import { MyComponent } from "./components/mainPage/Navbar";
// import Checkout from "./components/Calendar/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        {/* <MyComponent></MyComponent> */}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/book" element={<CalendarReactComponent />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
