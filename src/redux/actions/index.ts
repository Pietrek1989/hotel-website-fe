import { Offer, ReservationSave } from "../../types and interfaces";

export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";
export const UPDATE_SELECTED_OFFER = "UPDATE_SELECTED_OFFER";
export const UPDATE_NEW_RESERVATION = "UPDATE_NEW_RESERVATION";

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
