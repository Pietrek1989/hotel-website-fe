import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../../redux/actions";
import type { AppDispatch } from "../../redux/hooks";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/navbar.css";
import NavWeatherComponent2 from "./NavWeatherComponent2";
import {
  fetchSkiConditions,
  fetchWeather,
  fetchWeather5,
} from "./helperFunctions";
import {
  BsCalendar2Check,
  BsJournalText,
  BsFillEnvelopeOpenFill,
} from "react-icons/bs";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import logo from "../../assets/haus-rheingold-high-resolution-logo-color-on-transparent-background.png";

const Nav = () => {
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const weatherNow = useSelector((state: any) => state.weather.weatherNow);

  const fetchData = async () => {
    await dispatch(getUserData());
  };
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken");
  const refreshToken = urlParams.get("refreshToken");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    console.log(refreshToken, accessToken);
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchData();
      setIsLogged(true);
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleLogOut = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/session`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsLogged(false);
          navigate("/");
        } else {
          throw new Error("Logout failed");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchData();
    }
    fetchWeather(dispatch);
    fetchWeather5(dispatch);
    fetchSkiConditions(dispatch);
  }, []);
  const variants = {
    openLarge: { opacity: 1, width: "20%", borderRadius: "0%", x: 0 },
    openSmall: { opacity: 1, width: "100%", borderRadius: "0%", x: 0 },
    closed: { opacity: 0, width: "100%", borderRadius: "50%", x: "100%" },
  };

  const handleLogoClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (location.pathname === "/") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    },
    [location.pathname, navigate]
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-bgTra">
      <nav className=" container mx-auto px-6 pt-4 pb-1">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="text-gray-800 text-xl font-bold"
          >
            <img src={logo} alt="Logo" className="h-8 hover:scale-110" />
          </Link>
          <div className="flex items-center space-x-4">
            {isLogged ? (
              <Link
                to="/account"
                className="hidden md:block text-mainText font-bold"
                id={location.pathname === "/account" ? "active" : " "}
              >
                ACCOUNT
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-mainText font-bold"
                id={location.pathname === "/login" ? "active" : " "}
              >
                LOGIN
              </Link>
            )}

            <Link
              to="/book"
              className="hidden md:block text-mainText font-bold"
              id={location.pathname === "/book" ? "active" : " "}
            >
              BOOK
            </Link>
            <Link
              to="/faq"
              className="hidden md:block text-mainText font-bold"
              id={location.pathname === "/faq" ? "active" : " "}
            >
              AI BOT
            </Link>
            <Link
              to="/admin"
              className="hidden md:block text-mainText font-bold"
              id={location.pathname === "/admin" ? "active" : " "}
            >
              ADMIN
            </Link>
            <Link
              to="/weather"
              className="  text-mainText font-bold flex items-center"
            >
              ALPBACH{" "}
              {weatherNow.weather &&
                weatherNow.weather[0] &&
                weatherNow.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherNow.weather[0].icon}.png`}
                    alt="weather icon"
                  />
                )}
              {weatherNow.main &&
                weatherNow.main.temp &&
                parseInt(weatherNow.main.temp)}
              °
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-mainText font-bold focus:outline-none"
            >
              {/* Replace with your desired icon */}
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        <motion.nav
          className="fixed top-0 right-0 h-screen p-4 space-y-4 overflow-y-auto flex flex-col justify-center items-center nav-modal"
          style={{
            backgroundColor: "#efebe5",
          }}
          initial="closed"
          animate={
            isOpen
              ? window.innerWidth > 768
                ? "openLarge"
                : "openSmall"
              : "closed"
          }
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          {isOpen && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-mainText focus:outline-none absolute top-4 right-4"
            >
              {" "}
              x
            </button>
          )}

          <Link
            to="/book"
            className=" text-mainText font-bold flex nav-link-flex-container gap-2 "
            id={location.pathname === "/book" ? "active" : " "}
          >
            <span>
              <BsCalendar2Check />
            </span>{" "}
            <span>BOOK</span>
          </Link>

          <Link
            to="/faq"
            className="flex nav-link-flex-container gap-2  text-mainText font-bold"
            id={location.pathname === "/faq" ? "active" : " "}
          >
            <span>
              <BsJournalText />
            </span>
            <span>AI BOT</span>
          </Link>
          <Link
            to="/admin"
            className="flex nav-link-flex-container gap-2  text-mainText font-bold"
            id={location.pathname === "/admin" ? "active" : " "}
          >
            <span>
              <RiAdminFill />
            </span>
            <span>ADMIN</span>
          </Link>
          <Link
            to="/contact"
            className="flex nav-link-flex-container gap-2  text-mainText font-bold"
            id={location.pathname === "/contact" ? "active" : " "}
          >
            <span>
              <BsFillEnvelopeOpenFill />
            </span>
            <span>CONTACT</span>
          </Link>

          {isLogged ? (
            <Link
              to="/login"
              onClick={handleLogOut}
              className="flex nav-link-flex-container gap-2 text-mainText font-bold"
            >
              <span>
                <BiLogOut />
              </span>
              <span> LOG OUT </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex nav-link-flex-container gap-2  text-mainText font-bold"
            >
              <span>
                <BiLogIn />
              </span>
              <span>LOG IN </span>
            </Link>
          )}

          <Link to="/weather" className=" nav-link-flex-container">
            <NavWeatherComponent2 />
            <p className="text-center text-black">CLICK FOR MORE</p>
          </Link>
        </motion.nav>
      </nav>
    </header>
  );
};

export default Nav;
