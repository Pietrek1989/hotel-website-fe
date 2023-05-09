import React from "react";
import CalendarReactComponent from "./components/Calendar/CalenderReactCalendar";
import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/mainPage/Nav";
import MainLAyout from "./components/mainPage/MainLayout";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
// import Checkout from "./components/Calendar/Checkout/Checkout";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
          <Routes>
            <Route path="/" element={<MainLAyout />} />
            <Route path="/book" element={<CalendarReactComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;






