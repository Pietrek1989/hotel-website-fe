import { UPDATE_TOTAL_PRICE } from "../actions";

const initialState = {
  totalPrice: 0,
};

const totalPriceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };
    default:
      return state;
  }
};

export default totalPriceReducer;
