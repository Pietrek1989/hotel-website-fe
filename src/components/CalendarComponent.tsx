import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/calendar.css";

const CalendarComponent = () => {
  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);

  const handleDateClick = (dateInfo: any) => {
    if (selectStep === 0) {
      setSelectedRange({ start: dateInfo.date, end: null });
      setSelectStep(1);
    } else {
      const end = dateInfo.date;
      const range = {
        start: selectedRange.start,
        end: end > selectedRange.start ? end : selectedRange.start,
      };
      setSelectedRange(range);
      setSelectStep(0);
    }
  };

  const renderDayCellContent = (dayCellInfo: any) => {
    const date = dayCellInfo.date;
    const isSelected =
      selectedRange &&
      ((selectedRange.start &&
        !selectedRange.end &&
        date.getTime() === selectedRange.start.getTime()) ||
        (selectedRange.start &&
          selectedRange.end &&
          date >= selectedRange.start &&
          date <= selectedRange.end));

    if (isSelected) {
      return (
        <>
          <div className="selected">{dayCellInfo.dayNumberText}</div>
          <div className="fc-daygrid-day-events">
            {dayCellInfo.allDayEvents}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>{dayCellInfo.dayNumberText}</div>
          <div className="fc-daygrid-day-events">
            {dayCellInfo.allDayEvents}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={[
            {
              title: "Event 1",
              start: "2023-05-01T08:30:00",
              end: "2023-05-01T10:30:00",
            },
            {
              title: "Event 2",
              start: "2023-05-03T10:00:00",
              end: "2023-05-03T12:00:00",
            },
            {
              title: "Event 3",
              start: "2023-05-06T14:00:00",
              end: "2023-05-06T16:00:00",
            },
          ]}
          dayCellContent={renderDayCellContent}
        />
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
