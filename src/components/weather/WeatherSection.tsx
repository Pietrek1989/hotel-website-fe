import { useSelector } from "react-redux";
import { slideFromLeftVariantWithOpacity } from "../../utils/motion";
import { motion } from "framer-motion";
import FiveDaySection from "./WeatherFiveDay";

const WeatherSection = () => {
  const weatherNow = useSelector((state: any) => state.weather.weatherNow);

  return (
    <motion.div
      variants={slideFromLeftVariantWithOpacity}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center  min-h-screen text-gray-700 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 mt-20 p-0 w-5/5 lg:w-2/5 "
    >
      <div className="w-full max-w-screen-sm  bg-currentDayp-10 rounded-xl ring-8 ring-white ring-opacity-40 weather-hero   md:h-4/7 lg:h-3/7 weather-shadow flex flex-col justify-between ">
        <div className="flex justify-between p-5">
          <div className="flex flex-col bg-white rounded-lg p-4">
            <span className="font-semibold mt-1 text-4xl text-gray-500">
              Alpbach
            </span>
            <span className="text-4xl font-bold">
              {parseInt(weatherNow.main.temp)}°
            </span>
            <span className="font-semibold text-lg text-selected ">
              Feels like {Math.round(weatherNow.main.feels_like)}°
            </span>

            <span className="font-semibold text-lg text-lightBlue">
              Low {Math.round(weatherNow.main.temp_min)}°
            </span>
            <span className="font-semibold text-lg  text-red">
              high {Math.round(weatherNow.main.temp_max)}°
            </span>
          </div>
          <div className=" bg-bgTra rounded-lg max-h-36 max-w-44 flex flex-col items-center max">
            <img
              className=" h-24 w-24 fill-current"
              src={`https://openweathermap.org/img/wn/${weatherNow.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p className="font-bold text-sm px-2">
              {weatherNow.weather[0].description.toUpperCase()}
            </p>
          </div>
        </div>
        <FiveDaySection />
      </div>
    </motion.div>
  );
};

export default WeatherSection;
