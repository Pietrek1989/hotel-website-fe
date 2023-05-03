import { UPDATE_SELECTED_OFFER } from "../actions";

const initialState = {
  selectedOffer: {},
};

const selectedOfferReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_SELECTED_OFFER:
      return {
        ...state,
        selectedOffer: action.payload,
      };
    default:
      return state;
  }
};

export default selectedOfferReducer;
