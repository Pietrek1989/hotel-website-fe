const initialState = {
  weatherNow: {},
  weather5Days: {},
};

const weatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "GET_WEATHER_NOW":
      return {
        ...state,
        weatherNow: action.payload,
      };
    case "GET_WEATHER_5DAYS":
      return {
        ...state,
        weather5Days: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
