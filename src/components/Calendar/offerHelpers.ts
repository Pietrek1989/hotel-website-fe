import { Offer } from "../../types and interfaces";
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
