const initialState = {
    conditions: null,
  };
  
  const skiConditionsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "GET_SKI_CONDITION":
        return {
          ...state,
          conditions: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default skiConditionsReducer;
  