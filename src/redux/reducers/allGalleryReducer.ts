import { GET_ALL_GALLERY } from "../actions";

const initialState = {
  hero: [],
  gallery: [],
};

const allGalleryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_GALLERY:
      return {
        ...state,
        gallery: action.payload,
      };
    default:
      return state;
  }
};

export default allGalleryReducer;
