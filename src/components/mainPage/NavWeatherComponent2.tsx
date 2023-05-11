import { getTime } from "date-fns";
import { useSelector } from "react-redux"
import { ImCross } from 'react-icons/im';


const NavWeatherComponent2  = () => {

    const weatherNow = useSelector((state: any) => state.weather.weatherNow);
    const SkiConditions = useSelector((state: any) => state.skiConditions.conditions);

    const time = new Date()

    return (
        <>
        <div className="items-center flex  md:justify-center max-w-full  ">
        <div className="w-full  mb-2 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center px-4 h-52">
            <div className="text-md font-bold flex flex-col text-gray-900"><span className="uppercase">Alpbach</span> <span className="font-normal text-gray-700 text-sm">{time.toDateString()}</span></div>
            <div className="flex items-center justify-center">

            <img src={`https://openweathermap.org/img/wn/${weatherNow.weather[0].icon}.png`} alt="weather icon" />
             
            </div>
            <p className="text-gray-700 mb-2 text-sm">{weatherNow.weather[0].description}</p>
            <div className="text-1xl font-bold text-gray-900 mb-1">{parseInt(weatherNow.main.temp)}°</div>
        </div>
   
        <div className="w-full  mb-2 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer border flex flex-col justify-center items-center text-center px-4 h-52">
        <p className="mb-3 uppercase text-gray-900 font-bold ext-md">Ski resort:</p>
            <div className="text-md font-bold flex flex-col text-gray-900 text-md "><span className="uppercase"></span> <span className="font-normal text-black text-sm">{time.toDateString()}</span></div>
            <div className="flex items-center justify-center text-red py-1">
            <ImCross className=" text-red"/>
            </div>
            <p className="text-black mb-2 text-sm">
                {SkiConditions.items[0].operatingStatus}
        </p>
            <div className="text-1xl font-bold text-black mb-1"><span>{SkiConditions.items[0].weatherToday_Condition ? SkiConditions.items[0].weatherToday_Condition : "" }</span></div>
        </div>
    </div>
    </>
    )
}

export default NavWeatherComponent2