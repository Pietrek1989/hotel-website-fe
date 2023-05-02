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

export const isDateSelectable = (
  date: Date,
  selectingEnd: boolean,
  selectedRange: any,
  offers: Offer[]
) => {
  const start = new Date(date);
  const end = new Date(date);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1);

  const availableOffersForDate = offers.filter((offer) =>
    isOfferAvailable(offer, start, end)
  );

  if (availableOffersForDate.length > 0) {
    return true;
  }

  if (selectingEnd && selectedRange.start) {
    const prevDay = new Date(date);
    prevDay.setHours(0, 0, 0, 0);
    prevDay.setDate(prevDay.getDate() - 1);
    const prevDayEnd = new Date(date);
    prevDayEnd.setHours(0, 0, 0, 0);

    const availableOffersForPrevDay = offers.filter((offer) =>
      isOfferAvailable(offer, prevDay, prevDayEnd)
    );

    if (availableOffersForPrevDay.length > 0) {
      return true;
    }
  }

  return false;
};
