import { UPDATE_NEW_RESERVATION } from "../actions";

const initialState = {
  newReservation: 0,
};

const newReservationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_NEW_RESERVATION:
      return {
        ...state,
        newReservation: action.payload,
      };
    default:
      return state;
  }
};

export default newReservationReducer;
