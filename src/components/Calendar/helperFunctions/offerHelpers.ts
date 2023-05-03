import {
  Offer,
  Reservation,
  ReservationSave,
} from "../../../types and interfaces";
// Check if an offer is available for the given date range
// Check if any reservations overlap with the given date range

export const isOfferAvailable = (
  offer: Offer,
  start: Date,
  end: Date
): boolean => {
  const startDate = start.toISOString();
  const endDate = end.toISOString();

  return !offer.reservations.some((reservation) => {
    const reservationStart = new Date(
      reservation.content.checkin
    ).toISOString();
    const reservationEnd = new Date(reservation.content.checkout).toISOString();

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

export const saveReservation = async (
  cost: number,
  checkin: Date,
  checkout: Date,
  offerId: string
): Promise<ReservationSave> => {
  try {
    // const token = getToken(); // get bearer token from authentication module
    const response = await fetch(
      `${process.env.REACT_APP_BE_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include bearer token in the authorization header
        },
        body: JSON.stringify({
          user: "user_id_here", // set user ID here
          content: {
            cost,
            checkin,
            checkout,
            paid: false,
            canceled: false,
            offer: offerId,
          },
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to save reservation.");
    }
    return data.reservation as ReservationSave;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
