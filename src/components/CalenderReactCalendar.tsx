import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import { Offer } from "../types and interfaces";
import { utcToZonedTime } from "date-fns-tz";

const CalendarComponent: React.FC = () => {
  const hotelTimeZone = "Europe/Berlin";

  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);
  const [offers, setOffers] = React.useState<Offer[]>(() => []);

  const [availableOffers, setAvailableOffers] = React.useState<Offer[]>([]);

  const fetchOffers = async (): Promise<void> => {
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
          // Replace this with your pricing logic
          const pricePerNight = offer.priceSeason;
          return numberOfNights * pricePerNight;
        },
      }));
      setOffers(offersWithPriceFunction);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  const isOfferAvailable = (offer: Offer, start: Date, end: Date): boolean => {
    const startDate = start.toISOString();
    const endDate = end.toISOString();

    return !offer.reservations.some((reservation) => {
      const reservationStart = new Date(
        reservation.content.checkin
      ).toISOString();
      const reservationEnd = new Date(
        reservation.content.checkout
      ).toISOString();

      return (
        (startDate >= reservationStart && startDate < reservationEnd) ||
        (endDate > reservationStart && endDate <= reservationEnd) ||
        (startDate <= reservationStart && endDate >= reservationEnd)
      );
    });
  };
  React.useEffect(() => {
    fetchOffers();
  }, []);
  React.useEffect(() => {
    const updateAvailableOffers = async () => {
      if (!selectedRange || !selectedRange.start || !selectedRange.end) {
        setAvailableOffers([]);
        return;
      }

      const start = new Date(selectedRange.start);
      const end = new Date(selectedRange.end);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      const availableOffers = offers.filter((offer) =>
        isOfferAvailable(offer, start, end)
      );
      console.log("Offers:", offers);
      console.log("Selected Range Start:", selectedRange.start);
      console.log("Selected Range End:", selectedRange.end);
      console.log("Available Offers:", availableOffers);
      setAvailableOffers(availableOffers);
    };

    updateAvailableOffers();
  }, [selectedRange, offers]);

  const tileDisabled = ({ date, view }: any) => {
    if (view !== "month") return false;

    const currentDate = date;
    const todayDate = new Date();

    if (currentDate < todayDate) {
      return true;
    }

    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() + 1);

    // Check for available offers between the current date and the next day
    const availableOffersForDate = offers.filter((offer) =>
      isOfferAvailable(offer, start, end)
    );

    // If there are available offers for the current date, do not disable the tile
    if (availableOffersForDate.length > 0) {
      return false;
    }

    // Check if there are available offers for the previous day
    const prevDay = new Date(date);
    prevDay.setHours(0, 0, 0, 0);
    prevDay.setDate(prevDay.getDate() - 1);
    const prevDayEnd = new Date(date);
    prevDayEnd.setHours(0, 0, 0, 0);

    const availableOffersForPrevDay = offers.filter((offer) =>
      isOfferAvailable(offer, prevDay, prevDayEnd)
    );

    // If the user is selecting the end date and there are available offers for the previous day, do not disable the tile
    if (selectStep === 1 && availableOffersForPrevDay.length > 0) {
      return false;
    }

    // Disable tiles after the first booked out date when selecting the end date
    if (selectStep === 1 && selectedRange.start) {
      const firstBookedOutDate = offers
        .map((offer) => {
          const unavailableDates = offer.reservations
            .map((reservation) => ({
              start: new Date(reservation.content.checkin),
              end: new Date(reservation.content.checkout),
            }))
            .filter(
              (range) =>
                range.start > selectedRange.start &&
                range.end > selectedRange.start
            )
            .map((range) => range.start);

          return Math.min(...unavailableDates.map((date) => date.getTime()));
        })
        .reduce((min, date) => Math.min(min, date), Infinity);

      if (
        !isNaN(firstBookedOutDate) &&
        currentDate > new Date(firstBookedOutDate)
      ) {
        return true;
      }
    }

    // If there are no available offers for the current date and the previous day, disable the tile
    return true;
  };

  const handleDateClick = (date: Date) => {
    const dateInHotelTimeZone = utcToZonedTime(date, hotelTimeZone);

    if (selectStep === 0) {
      setSelectedRange({ start: dateInHotelTimeZone, end: null });
      setSelectStep(1);
    } else {
      if (dateInHotelTimeZone < selectedRange.start) {
        setSelectedRange({ start: dateInHotelTimeZone, end: null });
      } else {
        // Check if the range contains any disabled tiles
        const rangeContainsDisabledTile = (() => {
          const tempRangeStart = new Date(selectedRange.start);
          const tempRangeEnd = new Date(dateInHotelTimeZone);

          while (tempRangeStart <= tempRangeEnd) {
            if (tileDisabled({ date: tempRangeStart, view: "month" })) {
              return true;
            }
            tempRangeStart.setDate(tempRangeStart.getDate() + 1);
          }

          return false;
        })();

        // Only update the selected range if it does not contain any disabled tiles
        if (!rangeContainsDisabledTile) {
          setSelectedRange({ ...selectedRange, end: dateInHotelTimeZone });
          setSelectStep(0);
        }
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
