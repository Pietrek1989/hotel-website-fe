import { useDispatch } from "react-redux";
import { ImageState } from "../../../types and interfaces";
import { getSkiConditions, getWeather5Days, getWeatherNow } from "../../../redux/actions";


export const fetchImages = async (): Promise<ImageState> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/images`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    console.log("inn func", data);

    return data[0];
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    return { gallery: [], hero: [] };
  }
};




export const fetchWeather = async (dispatch : any) => {

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Inneralpbach&APPID=ed25fec635fe1f440571593fc2ef46e5&units=metric`
    );
    if (response.ok) {
      let data = await response.json();
      dispatch(getWeatherNow(data));
    } else {
      throw response.status + " " + response.statusText;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchWeather5 = async ( dispatch : any) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Inneralpbach&appid=ed25fec635fe1f440571593fc2ef46e5&units=metric`
    );
    if (response.ok) {
      let data5 = await response.json();
      console.log(data5.list);
      let arrayOf5 = data5.list;
      console.log(arrayOf5);
      dispatch(getWeather5Days(arrayOf5));
    } else {
      throw response.status + " " + response.statusText;
    }
  } catch (error) {
    console.log(error);
  }
};


export const fetchSkiConditions = async (dispatch : any) => {

  try {
    let response = await fetch(
      `http://feeds.snocountry.net/getSnowReport.php?apiKey=SnoCountry.example&ids=8000211`
    );
    if (response.ok) {
      let data = await response.json();
      dispatch(getSkiConditions(data));
    } else {
      throw response.status + " " + response.statusText;
    }
  } catch (error) {
    console.log(error);
  }
};
