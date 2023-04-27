import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";

const CalendarComponent = () => {
  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);

  const adjustDate = (date: Date) => {
    const cetOffsetInHours = 1; // CET is UTC+1
    const dstOffsetInHours = isDateInDST(date) ? 1 : 0; // Check if the date is in DST and apply an additional hour offset
    const totalOffsetInMs = (cetOffsetInHours + dstOffsetInHours) * 3600000;
    return new Date(date.getTime() + totalOffsetInMs);
  };

  const isDateInDST = (date: Date) => {
    const january = new Date(date.getFullYear(), 0, 1);
    const july = new Date(date.getFullYear(), 6, 1);
    const stdTimezoneOffset = Math.max(
      january.getTimezoneOffset(),
      july.getTimezoneOffset()
    );
    return date.getTimezoneOffset() < stdTimezoneOffset;
  };

  const handleDateClick = (date: Date) => {
    const adjustedDate = adjustDate(date);

    if (selectStep === 0) {
      setSelectedRange({ start: adjustedDate, end: null });
      setSelectStep(1);
    } else {
      if (adjustedDate < selectedRange.start) {
        setSelectedRange({ start: adjustedDate, end: null });
      } else {
        setSelectedRange({ ...selectedRange, end: adjustedDate });
        setSelectStep(0);
      }
    }
  };

  const tileClassName = ({ date, view }: any) => {
    if (view !== "month") return;
    const isSelected =
      selectedRange &&
      ((selectedRange.start &&
        !selectedRange.end &&
        isSameDate(date, selectedRange.start)) ||
        (selectedRange.start &&
          selectedRange.end &&
          (isSameDate(date, selectedRange.start) ||
            isSameDate(date, selectedRange.end) ||
            isDateInRange(date, selectedRange.start, selectedRange.end))));

    return isSelected ? "selected" : "";
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
    return date >= startDate && date <= endDate;
  };
  return (
    <>
      <div className="calendar-container">
        <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
      </div>
      {selectedRange && (
        <div>
          <p>Start: {selectedRange.start?.toISOString().slice(0, 10)}</p>
          <p>End: {selectedRange.end?.toISOString().slice(0, 10)}</p>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
