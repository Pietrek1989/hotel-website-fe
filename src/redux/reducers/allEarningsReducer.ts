import { GET_ALL_EARNINGS } from "../actions";

const initialState = {
  allEarnings: 0,
};

const allEarningsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_EARNINGS:
      return {
        ...state,
        allEarnings: action.payload,
      };
    default:
      return state;
  }
};

export default allEarningsReducer;
