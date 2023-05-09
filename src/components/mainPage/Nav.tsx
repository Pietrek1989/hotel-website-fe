import React, { useState, useEffect} from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../redux/actions";
import type { AppDispatch } from "../../redux/hooks";
import { useDispatch } from "react-redux";


const Nav = () => {
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);



  const fetchData = async () => {
    await dispatch(getUserData());
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchData();
    }
    if (localStorage.getItem("accessToken")) {
      setIsLogged(true);
    }

  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchData(); 
    }
   
  }, []);
  const variants = {
    openLarge: { opacity: 1, width: "20%", borderRadius: "0%", x: 0 },
    openSmall: { opacity: 1, width: "100%", borderRadius: "0%", x: 0 },
    closed: { opacity: 0, width: "100%", borderRadius: "50%", x: "100%" },
  };
const handleLogOut = () => {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
  navigate("/");
}

  return (
    <header className="fixed top-0 w-full z-50 bg-bgTra">
      <nav className=" container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-gray-800 text-xl font-bold">
            <img
              src={require("../../assets/haus-rheingold-high-resolution-logo-color-on-transparent-background.png")}
              alt="Logo"
              className="h-8"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/book" className="hidden md:block text-mainText">
              BOOK
            </Link>
            { isLogged ? <Link to="/userBoard" className="hidden md:block text-mainText">
              ACCOUNT
            </Link> :
            <Link to="/login" className="hidden md:block text-mainText">
              LOGIN
            </Link> }
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-mainText focus:outline-none"
            >
              {/* Replace with your desired icon */}
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        <motion.nav
          className="fixed top-0 right-0 h-screen p-4 space-y-4 overflow-y-auto flex flex-col justify-center items-center"
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
              {/* Replace with your desired close icon */}✖
            </button>
          )}
          {/* Replace with your menu items */}
          {isLogged ? 
          <Link to="/login" className="block text-mainText">
            LOG OUT 
          </Link> : 
                    <Link to="/login" onClick={handleLogOut} className="block text-mainText">
                    LOG IN 
                  </Link>
}
          <Link to="/book" className="block text-mainText">
            BOOK
          </Link>

          <Link to="/additional-option-1" className="block text-mainText">
            BLOG
          </Link>
          <Link to="/additional-option-2" className="block text-mainText">
            WEATHER
          </Link>
          {/* Add more options if needed */}
        </motion.nav>
      </nav>
    </header>
  );
};

export default Nav;
