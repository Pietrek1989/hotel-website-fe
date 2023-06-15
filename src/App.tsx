import React, { Suspense, useEffect } from "react";
import "./styles/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/mainPage/Nav";
import MainLAyout from "./components/mainPage/MainLayout";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import ContactPage from "./components/Contact/ContactPage";
import WeatherMain from "./components/weather/MainWeather";
import AccountDashboard from "./components/Account/AccountDashboard";
import LoaderFull from "./components/other/LoaderFull";
const CalendarReactComponent = React.lazy(
  () => import("./components/Calendar/CalenderReactCalendar")
);
const AdminMainLayout = React.lazy(
  () => import("./components/Admin/AdminMainLayout")
);

// import { setLicenseKey } from "@syncfusion/ej2-base";
  // setLicenseKey(`${process.env.REACT_APP_SYNCFUSION_KEY}`);


function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<MainLAyout />} />
          <Route
            path="/book"
            element={
              <Suspense fallback={<LoaderFull />}>
                <CalendarReactComponent />
              </Suspense>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/*" element={<AccountDashboard />} />
          <Route path="/weather" element={<WeatherMain />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<LoaderFull />}>
                <AdminMainLayout />
              </Suspense>
            }
          />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
