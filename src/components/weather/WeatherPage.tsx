import { useSelector } from "react-redux";
import DayCards from "./daycards"
import { WeatherData } from "../../types and interfaces";
import "../../styles/weather.css"

const WeatherPage = () => {
    
    const weatherNow = useSelector((state: any) => state.weather.weatherNow);
    const weather5 = useSelector((state: any) => state.weather.weather5Days);
    const SkiConditions = useSelector((state: any) => state.skiConditions.conditions);




    return (
        <div className="flex justify-evenly">
        <div className="flex flex-col items-center justify-center  min-h-screen text-gray-700 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 mt-20 p-0 w-2/5 ">

	<div className="w-full max-w-screen-sm bg-currentDay p-10 rounded-xl ring-8 ring-white ring-opacity-40 weather-hero  h-2/6  weather-shadow">
		<div className="flex justify-between">
			<div className="flex flex-col bg-white rounded-lg p-4">
            <span className="font-semibold mt-1 text-5xl text-gray-500">Alpbach</span>
				<span className="text-6xl font-bold">{parseInt(weatherNow.main.temp)}°</span>
                <span className="font-semibold text-lg  ">Feels like {Math.round(weatherNow.main.feels_like)}°</span>

                <span className="font-semibold text-lg ">Low {Math.round(weatherNow.main.temp_min)}°</span>
                <span className="font-semibold text-lg  ">high {Math.round(weatherNow.main.temp_max)}°</span>



			</div>
            <div className=" bg-bgTra rounded-lg h-32 w-32 flex flex-col items-center">
            <img className=" h-24 w-24 fill-current" src={`https://openweathermap.org/img/wn/${weatherNow.weather[0].icon}.png`} alt="weather icon" />
            <p className="font-bold">{weatherNow.weather[0].description.toUpperCase()}</p>

</div>
		</div>

	</div>
	<div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-bg text-mainText p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40 h-screen overflow-auto  weather-shadow" >
    {weather5.map((item: WeatherData) => {
  return <DayCards item={item} />;
})}

	</div>

</div>
<div className="flex flex-col items-center justify-center  min-h-screen text-gray-700 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 mt-20 p-0  w-2/5 ">

	<div className="w-full max-w-screen-sm bg-currentDay p-10 rounded-xl ring-8 ring-white ring-opacity-40 hero-ski h-2/6  weather-shadow">
    <div className="flex justify-between">
        <div className="flex flex-col  bg-white rounded-lg p-4">
        <span className="font-semibold mt-1 text-5xl text-gray-500">Alpbach</span>
            <span className="text-4xl font-bold">{SkiConditions.items[0].operatingStatus}</span>
            <span className="font-semibold text-lg ">Today: {SkiConditions.items[0].weatherToday_Condition ? SkiConditions.items[0].weatherToday_Condition : "Season finished"}</span>






        </div>

    </div>
</div>
<div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-bg text-mainText p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40 h-screen overflow-auto weather-shadow" >
<span className="font-semibold text-lg  ">Tomorrow: {SkiConditions.items[0].weatherTomorrow_Condition ? SkiConditions.items[0].weatherTomorrow_Condition :  "Season finished"}</span>
            <span className="font-semibold text-lg  ">In 2 days: {SkiConditions.items[0].weatherDayAfterTomorrow_Condition ? SkiConditions.items[0].weatherDayAfterTomorrow_Condition : "Season finished"  }</span>
            <span className="font-semibold text-lg  ">In 3 days: {SkiConditions.items[0].weatherDay4_Condition ? SkiConditions.items[0].weatherDay4_Condition : "Season finished"   }</span>
            <span className="font-semibold text-lg  ">In 4 days: {SkiConditions.items[0].weatherDay5_Condition ?  SkiConditions.items[0].weatherDay5_Condition : "Season finished" }</span>

	</div>
</div>
</div>
    )
}

export default WeatherPage