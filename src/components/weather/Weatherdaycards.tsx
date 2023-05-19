import { WeatherData } from "../../types and interfaces";
import { format } from "date-fns";

interface DayCardsProps {
  item: WeatherData;
}
const DayCards: React.FC<DayCardsProps> = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center  bg-white rounded-lg w-32 h-32 mx-2 flex-shrink-0 p-2">
      <p className="font-semibold ">{format(new Date(item.dt_txt), "HH:mm")}</p>
      <p className="font-semibold text-sm">{item.weather[0].description}</p>
      <img
        className=" bg-currentDay rounded-md my-1"
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
        alt="weather icon"
      />
      <p className="font-semibold text-lg ">{Math.round(item.main.temp)} °</p>
    </div>
  );
};

export default DayCards;
