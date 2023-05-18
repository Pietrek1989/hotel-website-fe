import { GET_ALL_USERS } from "../actions";

const initialState = {
  allUsers: 0,
};

const allUsersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default allUsersReducer;
