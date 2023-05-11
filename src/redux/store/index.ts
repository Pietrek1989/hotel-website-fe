import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import localStorage from "redux-persist/lib/storage";
import totalPriceReducer from "../reducers/totalPriceReducer";
import selectedOfferReducer from "../reducers/selectedOfferReducer";
import newReservationReducer from "../reducers/newReservationReducer";
import thunk from "redux-thunk"; 
import weatherReducer from "../reducers/weatherReducer";
import userDataReducer from "../reducers/userReducer";
import skiConditionsReducer from "../reducers/skiConditionReducer";
import paymentResultReducer from "../reducers/paymentResultReducer";

const persistConfig = {
  storage: localStorage,
  key: "root",
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY!,
    }),
  ],
};

const combinedReducer = combineReducers({
  totalPrice: totalPriceReducer,
  selectedOffer: selectedOfferReducer,
  newReservation: newReservationReducer,
  user: userDataReducer,
  weather: weatherReducer,
  skiConditions: skiConditionsReducer,
  paymentResult: paymentResultReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk); 
  },
});

const persistedStore = persistStore(store);

export { store, persistedStore };
