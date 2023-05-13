import React, { useRef } from 'react';
import { gsap, TweenMax } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import  "../../styles/hero.css"
import { heroHausvariants, welcomeVariants } from '../../utils/motion';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useLayoutEffect } from 'react';




gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection: React.FC = () => {
  const controls = useAnimation();


  const navigate = useNavigate();
  const handleBooking = () => {
    // Get the current scroll position of the window
    const scrollPosition = window.scrollY;
  
    // Check if the scroll position is less than a specific value (e.g., 100)
    if (scrollPosition < 100) {
      // If the scroll position is less than the specified value, scroll down
      gsap.to(window, { duration: 0.5, scrollTo: { y: window.innerHeight / 3 } });
    } else {
      // If the scroll position is greater than the specified value, navigate
      navigate("/book");
    }
  };
  

  const endTrigger = () => {
    return (
      document.documentElement.scrollHeight -
      window.innerHeight -
      (window.innerWidth <= 480 ? 0.5 * window.innerHeight : 0)
    );
  };
  

  const arrowRef = React.useRef(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);




    React.useEffect(() => {
      gsap.set('.main', { position: 'fixed', background: '#fff', width: '100%', maxWidth: '1600px', height: '100%', top: 0, left: '50%', x: '-50%' });
      gsap.set('.scrollDist', { width: '100%', height: '200%' });
      gsap.set('.logo', { transformOrigin: 'center' });

      gsap.timeline()
      .fromTo('.logo', { rotation: 0 }, { rotation: 360, duration: 1 });
      gsap.timeline({
        scrollTrigger: {
          trigger: '.scrollDist',
          start: 'top top',
          end: endTrigger,
          scrub: 1,
          pin: true, 
          pinSpacing: false, 
          immediateRender: false, 

        },
      })
                    .fromTo('.sky', { y: 0 }, { y: -200 }, 0)
        .fromTo('.logo', { y: 0 }, { y: -100,  duration: 0.5 }, 0)

        .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
        .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
        .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
        .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
        .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
        .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0)
        .fromTo('.welcome', { opacity: 1 }, { opacity: 0, duration: 0.5 }, 0.75); 

        TweenMax.to(arrowRef.current, 1, {
          y: -20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        return () => {
          // Reset the styles and animations when the component is unmounted
          gsap.set('.main', { clearProps: 'all' });
          gsap.set('.scrollDist', { clearProps: 'all' });
          gsap.set('.logo', { clearProps: 'all' });
      
          // Remove any existing scroll triggers
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };


      }, []);
      useLayoutEffect(() => {
        const originalOverflowX = document.body.style.overflowX;
        document.body.style.overflowX = 'hidden';
      
        return () => {
          document.body.style.overflowX = originalOverflowX;
        };
      }, []);
      useEffect(() => {
        const handleScroll = () => {
          const currentScrollPosition = window.scrollY;
          const scrollUp = currentScrollPosition < lastScrollPosition;
          const lowerThreshold = 700; // Adjust this value to control when the component becomes hidden
        
          if (heroSectionRef.current) {
            if (scrollUp || currentScrollPosition < lowerThreshold) {
              heroSectionRef.current.style.opacity = '1';
              heroSectionRef.current.style.pointerEvents = 'auto';
              heroSectionRef.current.style.transform = 'translateY(0)';
            } else {
              heroSectionRef.current.style.opacity = '0';
              heroSectionRef.current.style.pointerEvents = 'none';
              heroSectionRef.current.style.transform = 'translateY(-100%)';
            }
          }
        
          setLastScrollPosition(currentScrollPosition);
        };
        
        
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      },[])
  
      useEffect(() => {
        controls.start(i => ({
          y: [-10, 10, -10],
          transition: { delay: i * 0.2, repeat: Infinity, duration: 1 }
        }));
      }, [controls]);

    return (

      <div ref={heroSectionRef} className=" h-screen md:h-screen w-full transition-opacity duration-300">
      <div className="scrollDist absolute"></div>

      <div className="main absolute w-full">


        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <mask id="m">
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg" width="1200" height="800" />
            </g>
          </mask>

          <image className="sky" xlinkHref="https://assets.codepen.io/721952/sky.jpg" width="1200" height="590" />
          <image className="logo" xlinkHref="https://res.cloudinary.com/dvagn6szo/image/upload/v1683539328/8eeead46-0f0b-41be-8244-10fe9feeb56e_nirbop.png" x="50%" y="120" width="300" height="300" transform="translate(-150, 0)" />
          <image className="mountBg" xlinkHref="https://assets.codepen.io/721952/mountBg.png" width="1200" height="800" />

          
          <image className="mountMg" xlinkHref="https://assets.codepen.io/721952/mountMg.png" width="1200" height="800" />
          <image className="cloud2" xlinkHref="https://assets.codepen.io/721952/cloud2.png" width="1200" height="800" />
          <image className="mountFg" xlinkHref="https://assets.codepen.io/721952/mountFg.png" width="1200" height="800" />
          <image className="cloud1" xlinkHref="https://assets.codepen.io/721952/cloud1.png" width="1200" height="800" />
          <image className="cloud3" xlinkHref="https://assets.codepen.io/721952/cloud3.png" width="1200" height="800" />

          <foreignObject x="550" y="420" width="500" height="500">
      <rect fill="#fff" width="100%" height="100%" />
      <div className="w-20 h-20">
        <motion.div animate={controls}>
          <AiOutlineArrowDown className="w-full h-full" />
        </motion.div>
      </div>
    </foreignObject>

          <g mask="url(#m)">
            <rect fill="#fff" width="100%" height="100%" />
            <foreignObject x="290" y="300" width="600" height="500">
            <div className="space-x-1  poiter-events-auto flex flex-col items-center welcome mt-52 md:mt-0">
              <div>
            {Array.from("Welcome to").map((char, i) => (
              <motion.span
                key={i}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={welcomeVariants}
                className="text-5xl md:text-4xl font-bold text-white text-shadow-md text-center"
              >
                {char}
              </motion.span>
            ))}
            </div>
<div>
            <h1 className="space-x-1 mt-4 pointer-events-auto">
            {Array.from("Haus Rheingold Hotel").map((char, i) => (
              <motion.span
                key={i}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={heroHausvariants}
                className="text-5xl md:text-2xl font-bold text-gold text-shadow-md"
              >
                {char}
              </motion.span>
            ))}
          </h1>
          </div>
          <div className='mt-10'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBooking}
                className="	book-button text-black font-bold rounded pointer-events-auto"
              >
                Book now
              </motion.button>
              </div>

              </div>
            </foreignObject>
          </g>

        </svg>
      </div>

      </div>

  );
}


  export default HeroSection;



