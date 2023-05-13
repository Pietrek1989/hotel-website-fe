import { useSelector } from "react-redux";
import { WeatherData, WeatherListChunk } from "../../types and interfaces";
import FiveDayRadio from "./WeatherRadio";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DayCards from "./Weatherdaycards";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

const FiveDaySection = () => {
  const [weatherChunks, setWeatherChunks] = useState<WeatherListChunk[]>([]);
  const weather5 = useSelector((state: any) => state.weather.weather5Days);
  const [currentIndex, setCurrentIndex] = useState(0);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const chunks = [];
    let currentDay = "";
    let chunk: WeatherData[] = [];

    if (weather5) {
      weather5.forEach((item: WeatherData) => {
        const itemDay = format(new Date(item.dt_txt), "dd.MM");

        if (itemDay !== currentDay) {
          if (chunk.length) {
            chunks.push(chunk);
          }
          chunk = [];
          currentDay = itemDay;
        }
        chunk.push(item);
      });
    }

    if (chunk.length) {
      chunks.push(chunk);
    }
    setWeatherChunks(chunks);
    console.log(weatherChunks);
  }, [weather5]);

  return (
    <div className=" flex flex-col space-y-6 w-full max-w-screen-sm   bg-bg  text-mainText p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40  weather-shadow  h-3/4 ">
      <FiveDayRadio
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        weatherChunks={weatherChunks}
      />
      <Swiper
        navigation={true} // enable navigation
        slidesPerView={4} // try a smaller number
        spaceBetween={10}
        freeMode={true} // enable free mode
        className="flex overflow-x-auto p-5 weather-5 w-full"
      >
        {weatherChunks[currentIndex] &&
          weatherChunks[currentIndex].map(
            (item: WeatherData, index: number) => {
              return (
                <SwiperSlide key={index} className="w-1/4">
                  <DayCards item={item} />
                </SwiperSlide>
              );
            }
          )}
      </Swiper>
    </div>
  );
};

export default FiveDaySection;
