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
      const end = date;
      const range = {
        start: selectedRange.start,
        end: end > selectedRange.start ? end : selectedRange.start,
      };
      setSelectedRange(range);
      setSelectStep(0);
    }
  };

  const tileClassName = ({ date, view }: any) => {
    if (view !== "month") return;
    const isSelected =
      selectedRange &&
      ((selectedRange.start &&
        !selectedRange.end &&
        date.getTime() === selectedRange.start.getTime()) ||
        (selectedRange.start &&
          selectedRange.end &&
          date >= selectedRange.start &&
          date <= selectedRange.end));

    return isSelected ? "selected" : "";
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
