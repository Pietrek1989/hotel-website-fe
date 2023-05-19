// Check if two dates are the same

import { Offer } from "../../../types and interfaces";
import { isOfferAvailable } from "./offerHelpers";

// Compare year, month, and day of both dates
export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
// Check if a date is within a given date range
// Check if the date is between startDate and endDate
export const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
  return date >= startDate && date <= endDate;
};

export const rangesOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean => {
  const start1Str = start1.toISOString();
  const end1Str = end1.toISOString();
  const start2Str = start2.toISOString();
  const end2Str = end2.toISOString();

  return (
    (start1Str >= start2Str && start1Str < end2Str) ||
    (end1Str > start2Str && end1Str <= end2Str) ||
    (start1Str <= start2Str && end1Str >= end2Str)
  );
};

export const isDateSelectable = (
  date: Date,
  isEndDate: boolean,
  selectedRange: { start: Date; end: Date } | null,
  offers: Offer[]
): boolean => {
  // Check whether the date is before the start date
  if (isEndDate && selectedRange?.start && date < selectedRange.start) {
    return false;
  }

  // If the date is a start date or there is no selected range, check if there is at least one offer available on that date
  if (!isEndDate || !selectedRange) {
    return offers.some(
      (offer) =>
        !offer.reservations.some((reservation) =>
          isDateInRange(
            date,
            new Date(reservation.content.checkin),
            new Date(reservation.content.checkout)
          )
        )
    );
  }

  // If the date is an end date and there is a selected range, check if there is at least one offer available for the whole range
  const rangeStart = selectedRange.start;
  const rangeEnd = date;
  return offers.some(
    (offer) =>
      !offer.reservations.some((reservation) =>
        rangesOverlap(
          rangeStart,
          rangeEnd,
          new Date(reservation.content.checkin),
          new Date(reservation.content.checkout)
        )
      )
  );
};
