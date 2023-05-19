import { Offer } from "../../../types and interfaces";

export const isOfferAvailable = (
  offer: Offer,
  start: Date,
  end: Date
): boolean => {
  const startDate = start.toISOString();
  const endDate = end.toISOString();

  return !offer.reservations.some((reservation) => {
    const reservationStart = new Date(
      reservation.content?.checkin
    ).toISOString();
    const reservationEnd = new Date(
      reservation.content?.checkout
    ).toISOString();

    return (
      (startDate >= reservationStart && startDate < reservationEnd) ||
      (endDate > reservationStart && endDate <= reservationEnd) ||
      (startDate <= reservationStart && endDate >= reservationEnd)
    );
  });
};

export const isDateInSeason = (date: Date) => {
  const seasonStartDate = new Date(date.getFullYear(), 11, 10); // 10th of December
  const seasonEndDate = new Date(date.getFullYear(), 3, 15); // 15th of April

  if (date >= seasonStartDate || date <= seasonEndDate) {
    return true;
  }
  return false;
};

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
        let totalPrice = 0;

        for (let i = 1; i <= numberOfNights; i++) {
          const currentDate = new Date(start.getTime() + i * 1000 * 3600 * 24);
          if (isDateInSeason(currentDate)) {
            totalPrice += offer.priceSeason;
          } else {
            totalPrice += offer.priceOffSeason;
          }
        }
        return totalPrice;
      },
    }));

    return offersWithPriceFunction;
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    return [];
  }
};
