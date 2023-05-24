import {
  Offer,
  ReservationSave,
  User,
  WeatherHourly,
  WeatherNow,
  SkiConditions,
} from "../../types and interfaces";

export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";
export const UPDATE_SELECTED_OFFER = "UPDATE_SELECTED_OFFER";
export const UPDATE_NEW_RESERVATION = "UPDATE_NEW_RESERVATION";
export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILURE = "GET_USER_DATA_FAILURE";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";
export const GET_WEATHER_NOW = "GET_WEATHER_NOW";
export const GET_WEATHER_5DAYS = "GET_WEATHER_5DAYS";
export const GET_SKI_CONDITION = "GET_SKI_CONDITION";
export const UPDATE_PAYMENT_RESULT = "UPDATE_PAYMENT_RESULT";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_RESERVATIONS = " GET_ALL_RESERVATIONS";
export const GET_THIS_MONTH_RESERVATIONS = "GET_THIS_MONTH_RESERVATIONS";
export const GET_THIS_MONTH_EARNINGS = "GET_THIS_MONTH_EARNINGS";
export const GET_ALL_EARNINGS = "GET_ALL_EARNINGS";
export const GET_ALL_INFO_RESERVATIONS = "GET_ALL_INFO_RESERVATIONS";

export const updateTotalPrice = (price: number) => {
  return {
    type: "UPDATE_TOTAL_PRICE",
    payload: price,
  };
};

export const updateSelectedOffer = (offer: Offer) => {
  return {
    type: "UPDATE_SELECTED_OFFER",
    payload: offer,
  };
};
export const updateNewReservation = (reservation: ReservationSave) => {
  return {
    type: "UPDATE_NEW_RESERVATION",
    payload: reservation,
  };
};

export const getUserDataRequest = () => ({
  type: GET_USER_DATA_REQUEST,
});

export const getUserDataSuccess = (userData: User) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: userData,
});

export const getUserDataFailure = (error: Error) => ({
  type: GET_USER_DATA_FAILURE,
  payload: error,
});

export const getUserData = () => async (dispatch: any) => {
  dispatch(getUserDataRequest());
  try {
    const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me/info`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
    });

    if (res.ok) {
      const userData = (await res.json()) as User;
      dispatch(getUserDataSuccess(userData));
    } else if (res.status === 401) {
      // access token has expired or is invalid, refresh access token
      await refreshAccessToken();

      // try to get user data again
      const newAccessToken = localStorage.getItem("accessToken");
      console.log("the updated access", newAccessToken);
      if (newAccessToken) {
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        if (response.ok) {
          const userData = (await response.json()) as User;
          dispatch(getUserDataSuccess(userData));
        }
      }
      // if we still can't get user data, redirect to login page
      dispatch(getUserDataFailure(new Error("Failed to get user data")));
    } else {
      dispatch(getUserDataFailure(new Error("Failed to get user data")));
    }
  } catch (error) {
    dispatch(getUserDataFailure(error as Error));
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("refresh in func", refreshToken);
  const response = await fetch("http://localhost:3001/users/session/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentRefreshToken: refreshToken,
    }),
  });
  console.log(response.status);
  if (response.ok) {
    console.log("response", response);
    const { accessToken, refreshToken } = await response.json();
    console.log("the new refresh token", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else if (response.status === 401) {
    // refresh token has expired, log user out and redirect to login page
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    window.location.href = "/";
  } else {
    console.log("last error");
  }
};

export const getWeatherNow = (weather: WeatherNow) => {
  return {
    type: "GET_WEATHER_NOW",
    payload: weather,
  };
};

export const getWeather5Days = (weather: WeatherHourly) => {
  return {
    type: "GET_WEATHER_5DAYS",
    payload: weather,
  };
};

export const getSkiConditions = (conditions: SkiConditions) => {
  return {
    type: "GET_SKI_CONDITION",
    payload: conditions,
  };
};

export const updatePaymentResult = (result: string) => {
  return {
    type: UPDATE_PAYMENT_RESULT,
    payload: result,
  };
};

export const getAllUsers = (users: User[]) => {
  return {
    type: GET_ALL_USERS,
    payload: users,
  };
};
export const getAllReservationsCount = (reservationsCount: number) => {
  return {
    type: GET_ALL_RESERVATIONS,
    payload: reservationsCount,
  };
};

export const getThisMonthReservationsCount = (reservations: number) => {
  return {
    type: GET_THIS_MONTH_RESERVATIONS,
    payload: reservations,
  };
};

export const getThisMonthEearnings = (earnings: Number) => {
  return {
    type: GET_THIS_MONTH_EARNINGS,
    payload: earnings,
  };
};

export const getAllEarnings = (earnings: Number) => {
  return {
    type: GET_ALL_EARNINGS,
    payload: earnings,
  };
};
export const getAllInfoReservations = (reservations: ReservationSave[]) => {
  return {
    type: GET_ALL_INFO_RESERVATIONS,
    payload: reservations,
  };
};
