import { GET_ALL_RESERVATIONS } from "../actions";

const initialState = {
  allReservations: 0,
};

const allReservationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_RESERVATIONS:
      return {
        ...state,
        allReservations: action.payload,
      };
    default:
      return state;
  }
};

export default allReservationsReducer;
