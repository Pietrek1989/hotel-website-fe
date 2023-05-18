import { GET_THIS_MONTH_EARNINGS } from "../actions";

const initialState = {
  thisMonthEarnings: 0,
};

const thisMonthEarningsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_THIS_MONTH_EARNINGS:
      return {
        ...state,
        thisMonthEarnings: action.payload,
      };
    default:
      return state;
  }
};

export default thisMonthEarningsReducer;
