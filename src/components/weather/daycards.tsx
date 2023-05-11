import { WeatherData } from "../../types and interfaces";
import { format } from 'date-fns';

interface DayCardsProps {
    item: WeatherData;
}
const DayCards: React.FC<DayCardsProps> = ({ item }) => {



    return (
		<div className="flex justify-between items-center w-full">
<span className="font-semibold text-lg w-1/4 ">{format(new Date(item.dt_txt), 'dd-MM HH:mm')}</span>
				<span className="font-semibold w-1/4" flex-1>{item.weather[0].description}</span>
            <img  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weather icon" />
			<span className="font-semibold text-lg w-1/4 text-right">{Math.round(item.main.temp)} °</span>


		</div>
    )
}

export default DayCards