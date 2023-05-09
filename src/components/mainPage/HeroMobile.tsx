import React, { useState } from "react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.min.css";
import "../../styles/hero.css";
import {
  heroHausvariants,
  logoVariants,
  welcomeVariants,
} from "../../utils/motion";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const HeroMobile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const handleBooking = () => {
    navigate("/book");
  };
  //   const handleImageLoad = () => {
  //   setLoadedImages((prev) => prev + 1);
  //   if (loadedImages + 1 === 3) {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="relative hero-container h-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {[
          "20210112_144917_rufjdi",
          "20210116_143257_cvdzz4",
          "56b6ea22-8c8d-4a3c-9c93-c9630157e96d_zwv8c4",
        ].map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dvagn6szo/image/upload/v1683111699/hotel-Rheingold/tinified/${image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40">
        {" "}
        <motion.img
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          whileHover="hover"
          src={require("../../assets/8eeead46-0f0b-41be-8244-10fe9feeb56e.png")}
          alt="Logo"
          className="mx-auto mt-4 pointer-events-auto h-60 w-60 text-shadow-md logo-shadow "
        />
      </div>

      <div className="absolute inset-0  z-10 pointer-events-none">
        <div className=" absolute left-0 right-0 top-[25%] md:top-[150px]">
          <motion.img
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            src={require("../../assets/8eeead46-0f0b-41be-8244-10fe9feeb56e.png")}
            alt="Logo"
            className="mx-auto mt-4 pointer-events-auto h-40 w-40 md:h-60 md:w-60 text-shadow-md logo-shadow justify-center hero-logo"
          />
        </div>
        <div className="absolute bottom-8 md:bottom-24 left-0 right-0 sm:right-50  md:left-10 flex flex-col  items-center md:items-start">
          <div className="space-x-1  poiter-events-auto">
            {Array.from("Welcome to").map((char, i) => (
              <motion.span
                key={i}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={welcomeVariants}
                className="text-2xl  md:text-4xl font-bold text-white text-shadow-md"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <h1 className="space-x-1 mt-4 pointer-events-auto">
            {Array.from("Haus Rheingold Hotel").map((char, i) => (
              <motion.span
                key={i}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={heroHausvariants}
                className="text-2xl  md:text-4xl font-bold text-white text-shadow-md"
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <p className="drop-shadow-md font-semibold text-sm md:text-base">
            Book your stay at very popular Alpine destination Alpbach!
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBooking}
            className="book-button text-white font-bold  rounded pointer-events-auto sm:ml-0 md:ml-24 "
          >
            Book now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HeroMobile;
