import { UPDATE_PAYMENT_RESULT } from "../actions";

const initialState = {
  paymentResult: "",
};

const paymentResultReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_PAYMENT_RESULT:
      return {
        ...state,
        paymentResult: action.payload,
      };
    default:
      return state;
  }
};

export default paymentResultReducer;
