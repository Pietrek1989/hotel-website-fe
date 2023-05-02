import { OfferState } from "../../types and interfaces";
import { UPDATE_OFFER_PRICE } from "../actions";

const initialState: OfferState = {
  offers: [],
};

const offerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_OFFER_PRICE:
      const updatedOffers = state.offers.map((offer) => {
        if (offer._id === action.payload.id) {
          return { ...offer, price: action.payload.price };
        }
        return offer;
      });
      return { ...state, offers: updatedOffers };
    default:
      return state;
  }
};

export default offerReducer;
