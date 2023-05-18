import { GET_ALL_INFO_RESERVATIONS } from "../actions";

const initialState = {
  allInfoReservations: 0,
};

const allInfoReservationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_INFO_RESERVATIONS:
      return {
        ...state,
        allInfoReservations: action.payload,
      };
    default:
      return state;
  }
};

export default allInfoReservationsReducer;
