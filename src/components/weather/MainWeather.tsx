import SkiSection from "./SkiSection";
import WeatherSection from "./WeatherSection";
import "../../styles/weather.css";

const WeatherMain = () => {
  return (
    <div className="flex justify-evenly flex-col lg:flex-row ">
      <WeatherSection />
      <SkiSection />
    </div>
  );
};

export default WeatherMain;
