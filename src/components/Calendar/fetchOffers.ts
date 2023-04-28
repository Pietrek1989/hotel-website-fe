import { Offer } from "../../types and interfaces";
// Fetch offers from the server
// Fetch offers and update state
export const fetchOffers = async (): Promise<Offer[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/offers`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    const offersWithPriceFunction = data.map((offer: any) => ({
      ...offer,
      calculatePrice: (start: Date, end: Date) => {
        const numberOfNights =
          (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        const pricePerNight = offer.priceSeason;
        return numberOfNights * pricePerNight;
      },
    }));
    return offersWithPriceFunction;
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    return [];
  }
};
