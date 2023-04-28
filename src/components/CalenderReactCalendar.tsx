import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import { Offer } from "../types and interfaces";

const CalendarComponent: React.FC = () => {
  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);
  const [disabledDates, setDisabledDates] = React.useState<
    Record<string, boolean>
  >({});
  const [availableOffers, setAvailableOffers] = React.useState<Offer[]>([]);

  const fetchOffers = async (): Promise<Offer[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/offers`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data.map((offer: any) => ({
        ...offer,
        calculatePrice: (start: Date, end: Date) => {
          const numberOfNights =
            (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
          // Replace this with your pricing logic
          const pricePerNight = offer.priceSeason;
          return numberOfNights * pricePerNight;
        },
      }));
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      return [];
    }
  };

  const getDisabledDates = (offers: Offer[]): Record<string, boolean> => {
    const disabledDates: Record<string, boolean> = {};

    offers.forEach((offer) => {
      offer.reservations.forEach((reservation) => {
        const { checkin, checkout } = reservation.content;
        const startDate = new Date(checkin);
        const endDate = new Date(checkout);

        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          const dateString = date.toISOString().slice(0, 10);
          disabledDates[dateString] = true;
        }
      });
    });

    return disabledDates;
  };

  const filterOffersByDateRange = (
    offers: Offer[],
    start: Date,
    end: Date
  ): Offer[] => {
    return offers.filter((offer) => {
      return offer.reservations.every((reservation) => {
        const checkin = new Date(reservation.content.checkin);
        const checkout = new Date(reservation.content.checkout);

        return (
          (checkin < start && checkout < start) ||
          (checkin > end && checkout > end)
        );
      });
    });
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const offers = await fetchOffers();
      const disabledDatesData = getDisabledDates(offers);
      setDisabledDates(disabledDatesData);

      if (selectedRange && selectedRange.start && selectedRange.end) {
        const filteredOffers = filterOffersByDateRange(
          offers,
          selectedRange.start,
          selectedRange.end
        );
        setAvailableOffers(filteredOffers);
      } else {
        setAvailableOffers([]);
      }
    };

    fetchData();
  }, [selectedRange]);

  const tileDisabled = ({ date, view }: any) => {
    if (view !== "month") return false;

    const dateString = date.toISOString().slice(0, 10);
    return disabledDates[dateString] === true;
  };

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
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
        />
      </div>
      {selectedRange && (
        <div>
          <p>Start: {selectedRange.start?.toDateString()}</p>
          <p>End: {selectedRange.end?.toDateString()}</p>
        </div>
      )}
      <div>
        <h2>Available Offers</h2>
        {availableOffers.length === 0 ? (
          <p>No offers available for the selected date range.</p>
        ) : (
          <ul>
            {availableOffers.map((offer) => (
              <li key={offer._id}>
                {offer.name} - Price: $
                {selectedRange.start && selectedRange.end
                  ? offer.calculatePrice(selectedRange.start, selectedRange.end)
                  : "N/A"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CalendarComponent;
