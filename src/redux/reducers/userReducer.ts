import {
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
  } from "../actions";
  
  const initialState = {
    userData: null,
    loading: false,
    error: null,
  };
  
  const userDataReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case GET_USER_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_USER_DATA_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          loading: false,
          error: null,
        };
      case GET_USER_DATA_FAILURE:
        return {
          ...state,
          userData: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userDataReducer;
  