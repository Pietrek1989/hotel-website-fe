import { Dispatch } from "redux";

import {
  Offer,
  Reservation,
  ReservationSave,
} from "../../../types and interfaces";
import { updateNewReservation } from "../../../redux/actions";
import { useSelector } from "react-redux";

export const saveReservation = async (
  cost: number,
  checkin: Date,
  checkout: Date,
  offerId: string,
  dispatch: Dispatch,
  token: any
): Promise<String> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUzNzdiYmI0ODA1YTYzZGUzNGI3MjEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4MzE5MjIxOSwiZXhwIjoxNjgzMjc4NjE5fQ._-Wgnm78A7uDP50qL36IDl--x5gGysrmX7bkFW_w2Ok`,
        },
        body: JSON.stringify({
          content: {
            cost: cost,
            checkin: checkin,
            checkout: checkout,
            offer: offerId,
          },
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to save reservation.");
    }

    const reservation = await response.json();
    console.log(reservation);
    dispatch(updateNewReservation(reservation));
    sendPayment(reservation, token);
    return reservation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendPayment = async (
  reservation: ReservationSave,
  token: any
): Promise<String> => {
  try {
    const newReservation = { ...reservation, token };
    console.log("reservation", reservation);
    // const token = getToken(); // get bearer token from authentication module
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUzNzdiYmI0ODA1YTYzZGUzNGI3MjEiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY4MzE5MjIxOSwiZXhwIjoxNjgzMjc4NjE5fQ._-Wgnm78A7uDP50qL36IDl--x5gGysrmX7bkFW_w2Ok`, // include bearer token in the authorization header
        },
        body: JSON.stringify(newReservation),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Failed to pay for reservation.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCurrentReservation = async (
  currentReservation: string
): Promise<ReservationSave> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/reservations/${currentReservation}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();

    return data.reservation;
  } catch (error) {
    console.error("Failed to fetch reservation:", error);
    throw error;
  }
};
