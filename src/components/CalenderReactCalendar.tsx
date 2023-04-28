import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";

const CalendarComponent = () => {
  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);

  const handleDateClick = (date: Date) => {
    if (selectStep === 0) {
      setSelectedRange({ start: date, end: null });
      setSelectStep(1);
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: null });
      } else {
        setSelectedRange({ ...selectedRange, end: date });
        setSelectStep(0);
      }
    }
  };

  const isStartDateSelected = (date: Date, selectedRange: any) => {
    return date.getTime() === selectedRange?.start?.getTime();
  };

  const isDateInRange = (date: Date, selectedRange: any) => {
    return (
      date >= selectedRange?.start &&
      date <= (selectedRange?.end ?? selectedRange?.start)
    );
  };

  const tileClassName = ({ date, view }: any) => {
    if (view !== "month") return;

    if (!selectedRange) return "";

    const { start, end } = selectedRange;

    const isStartDate = start && isSameDate(date, start);
    const isEndDate = end && isSameDate(date, end);
    const isInDateRange = start && end && isDateInRange(date, start, end);

    const isSelected = isStartDate || isEndDate || isInDateRange;

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
          <p>Start: {selectedRange.start?.toDateString()}</p>
          <p>End: {selectedRange.end?.toDateString()}</p>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
