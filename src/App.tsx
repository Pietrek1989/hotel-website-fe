import React from "react";
import CalendarReactComponent from "./components/Calendar/CalenderReactCalendar";
import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Checkout from "./components/Calendar/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarReactComponent />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
