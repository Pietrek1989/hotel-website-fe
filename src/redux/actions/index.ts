export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";
export const UPDATE_OFFER_PRICE = "UPDATE_OFFER_PRICE";

export const updateTotalPrice = (price: number) => {
  return {
    type: "UPDATE_TOTAL_PRICE",
    payload: price,
  };
};

export const updateOfferPrice = (_id: string, price: number) => {
  return {
    type: "UPDATE_OFFER_PRICE",
    payload: { _id, price },
  };
};
