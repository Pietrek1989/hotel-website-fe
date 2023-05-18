import { GET_THIS_MONTH_RESERVATIONS } from "../actions";

const initialState = {
  thisMonthReservations: 0,
};

const thisMonthReservationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_THIS_MONTH_RESERVATIONS:
      return {
        ...state,
        thisMonthReservations: action.payload,
      };
    default:
      return state;
  }
};

export default thisMonthReservationsReducer;
