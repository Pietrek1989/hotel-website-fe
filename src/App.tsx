import React from "react";
import CalendarReactComponent from "./components/Calendar/CalenderReactCalendar";
import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/mainPage/Nav";
import MainLAyout from "./components/mainPage/MainLayout";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import ContactPage from "./components/Contact/ContactPage";
import WeatherMain from "./components/weather/MainWeather";
import AdminMainLayout from "./components/Admin/AdminMainLayout";

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
          <Route path="/weather" element={<WeatherMain />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/*" element={<AdminMainLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
