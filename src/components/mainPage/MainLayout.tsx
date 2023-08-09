import { useEffect, useRef, useState } from "react";
import Discover from "./Discover";
import Footer from "./Footer";
import Gallery from "./Gallery";
import HeroSection from "./HeroSection";
import Testimonials from "./testimonials";
import { motion, useAnimation } from "framer-motion";
import { heroHausvariants, welcomeVariants } from "../../utils/motion";
import "../../styles/heromobile.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DiscoverMobile from "./DiscoverMobile";

const MainLAyout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    controls.start((i) => ({
      y: [-10, 10, -10],
      transition: { delay: i * 0.2, repeat: Infinity, duration: 1 },
    }));
  }, []);

  const scrollToBookNow = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleBook = () => {
    navigate("/book");
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className="wrapper">
            <div className="header">
              <div className="welcome absolute mx-auto top-20 bottom-50 text-center">
                {Array.from("Welcome to").map((char, i) => (
                  <motion.span
                    key={i}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={welcomeVariants}
                    className="text-4xl  md:text-4xl font-bold text-white text-shadow-md"
                  >
                    {char}
                  </motion.span>
                ))}
                <h1 className="space-x-1 mt-4 pointer-events-auto">
                  {" "}
                  {Array.from("Haus Rheingold Hotel").map((char, i) => (
                    <motion.span
                      key={i}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      variants={heroHausvariants}
                      className="text-3xl  md:text-4xl font-bold text-white text-shadow-md"
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
                <motion.div
                  animate={controls}
                  onClick={scrollToBookNow}
                  className="mt-3"
                >
                  <AiOutlineArrowDown className="w-24 h-24 mx-auto" />
                </motion.div>
              </div>
              <img
                className="background"
                src={require("../../assets/karl-kohler-N_MXyBUV5hU-unsplash.jpg")}
                alt="mountain background"
              />
              <img
                className="foreground2"
                src={require("../../assets/cloud4.png")}
                alt="cloud foreground"
                loading="lazy"
              />
              <img
                className="foreground"
                rel="preload"
                loading="lazy"
                src={require("../../assets/cloud6.png")}
                alt="cloud foreground 2"
              />
              <img
                className=" village"
                loading="lazy"
                src={require("../../assets/20210113_105757-removebg-preview.png")}
                alt="hotel house"
              />
            </div>
            <div className="section">
              <div
                className=" absolute left-0 right-0 -top-[230px] scale-150 -z-1"
                ref={sectionRef}
              >
                <motion.img
                  initial="hidden"
                  animate="visible"
                  src={require("../../assets/haus-rheingold-high-resolution-logo-color-on-transparent-background.png")}
                  alt="Logo"
                  className="mx-auto mt-4 pointer-events-auto h-40 w-40 md:h-60 md:w-60 text-shadow-lg logo-shadow justify-center hero-logo logo-animation"
                />
              </div>

              <motion.button
                onClick={handleBook}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="book-button text-white font-bold  rounded pointer-events-auto sm:ml-0 md:ml-24 book-button-mobile"
              >
                Book now
              </motion.button>
            </div>
            <DiscoverMobile />

            <Gallery />

            <Testimonials />

            <Footer />
          </div>
        </>
      ) : (
        <>
          <HeroSection />
          <Discover />
          <Gallery />
          <Testimonials />

          <Footer />
        </>
      )}
    </>
  );
};

export default MainLAyout;
