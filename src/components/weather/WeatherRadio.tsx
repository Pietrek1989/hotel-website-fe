import { useState } from "react";
import { WeatherListChunk } from "../../types and interfaces";
import { format } from "date-fns";

interface FiveDayRadioProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  weatherChunks: WeatherListChunk[];
}

const FiveDayRadio: React.FC<FiveDayRadioProps> = ({
  currentIndex,
  setCurrentIndex,
  weatherChunks,
}) => {
  const [selectedDay, setSelectedDay] = useState("1");
  const handleToday = () => {
    setCurrentIndex(0);
  };

  const handleTomorrow = () => {
    setCurrentIndex(1);
  };
  const handleDay3 = () => {
    setCurrentIndex(2);
  };
  const handleDay4 = () => {
    setCurrentIndex(3);
  };

  return (
    <div
      className="flex justify-around rounded-xl bg-bgTra p-2 w-full text-md md:text-sm  lg:text-base"
      x-data="app"
    >
      <div>
        <input
          type="radio"
          name="option"
          id="1"
          className="peer hidden"
          checked={selectedDay === "1"}
          onChange={() => setSelectedDay("1")}
        />{" "}
        <label
          htmlFor="1"
          className="block cursor-pointer select-none rounded-xl px-5  text-center peer-checked:bg-selected peer-checked:font-bold peer-checked:text-black"
          onClick={handleToday}
        >
          TODAY
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="option"
          id="2"
          className="peer hidden"
          checked={selectedDay === "2"}
          onChange={() => setSelectedDay("2")}
        />{" "}
        <label
          htmlFor="2"
          className="block cursor-pointer select-none rounded-xl px-5 text-center peer-checked:bg-selected peer-checked:font-bold peer-checked:text-black"
          onClick={handleTomorrow}
        >
          TOMORROW
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="option"
          id="3"
          className="peer hidden"
          checked={selectedDay === "3"}
          onChange={() => setSelectedDay("3")}
        />{" "}
        <label
          htmlFor="3"
          className="block cursor-pointer select-none rounded-xl px-5 text-center peer-checked:bg-selected peer-checked:font-bold peer-checked:text-black"
          onClick={handleDay3}
        >
          {weatherChunks[2] &&
            format(new Date(weatherChunks[2][0].dt_txt), "dd-MM")}
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="option"
          id="4"
          className="peer hidden"
          checked={selectedDay === "4"}
          onChange={() => setSelectedDay("4")}
        />{" "}
        <label
          htmlFor="4"
          className="block cursor-pointer select-none rounded-xl px-5 text-center peer-checked:bg-selected peer-checked:font-bold peer-checked:text-black"
          onClick={handleDay4}
        >
          {" "}
          {weatherChunks[3] &&
            format(new Date(weatherChunks[3][0].dt_txt), "dd-MM")}
        </label>
      </div>
    </div>
  );
};

export default FiveDayRadio;
