import { useEffect, useState } from "react";
import Discover from "./Discover";
import Footer from "./Footer";
import Gallery from "./Gallery";
import HeroMobile from "./HeroMobile";
import HeroSection from "./HeroSection";
import Testimonials from "./testimonials";




const MainLAyout = () => {


  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  return (
    <>
          {isMobile ? <HeroMobile /> : <HeroSection />}

      {/* <HeroSection /> */}
      {/* <HeroMobile /> */}
      <Discover />
      <Gallery />
      <Testimonials />
      <Footer />

    </>
  );
};

export default MainLAyout;
