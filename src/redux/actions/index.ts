export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

export const updateTotalPrice = (price: number) => {
  return {
    type: "UPDATE_TOTAL_PRICE",
    payload: price,
  };
};
