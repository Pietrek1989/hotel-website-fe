// Check if two dates are the same
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
