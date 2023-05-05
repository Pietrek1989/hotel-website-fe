import React, { useState } from "react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "swiper/swiper-bundle.min.css";
import "../../styles/hero.css";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const HeroSection = () => {
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

  const welcomeVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: 0.05 * i },
    }),
  };

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      rotate: 360,
      transition: { delay: 1.5, duration: 1 },
    },
  };

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
          "20190225_122659_lohfph",
          "20210116_143257_cvdzz4",
          "56b6ea22-8c8d-4a3c-9c93-c9630157e96d_zwv8c4",
        ].map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/dvagn6szo/image/upload/v1683111699/hotel-Rheingold/tinified/${image}.jpg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="space-x-1 pointer-events-auto">
          {Array.from("Welcome to").map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={welcomeVariants}
              className="text-4xl font-bold text-white text-shadow-md"
            >
              {char}
            </motion.span>
          ))}
        </div>
        <motion.img
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          src={require("../../assets/haus-rheingold-high-resolution-logo-color-on-transparent-background (1).png")}
          alt="Logo"
          className="mx-auto mt-4 pointer-events-auto h-60 w-60 text-shadow-md logo-shadow"
        />
        <p className="text-2xl mt-4 text-white text-shadow-md pointer-events-auto">
          Slogan
        </p>
        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-800 pointer-events-auto"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
