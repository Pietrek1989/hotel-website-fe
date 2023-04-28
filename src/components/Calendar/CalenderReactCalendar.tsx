import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";
import { Offer } from "../../types and interfaces";
import { utcToZonedTime } from "date-fns-tz";
import { fetchOffers } from "./fetchOffers";
import { isOfferAvailable } from "./offerHelpers";
import { isSameDate, isDateInRange } from "./calendarHelpers";

const CalendarComponent: React.FC = () => {
  const hotelTimeZone = "Europe/Berlin";

  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);
  const [offers, setOffers] = React.useState<Offer[]>([]);
  const [availableOffers, setAvailableOffers] = React.useState<Offer[]>([]);

  // Fetch offers when the component is mounted
  React.useEffect(() => {
    const fetchAndSetOffers = async () => {
      const fetchedOffers: any = await fetchOffers();
      setOffers(fetchedOffers);
    };
    fetchAndSetOffers();
  }, []);
  // Update available offers when the selected date range or offers change
  // Update available offers based on selected date range
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

  const isDateSelectable = (date: Date, selectingEnd: boolean) => {
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
  const getFirstBookedOutDate = (startDate: Date) => {
    const firstBookedOutDate = offers
      .map((offer) => {
        const unavailableDates = offer.reservations
          .map((reservation) => ({
            start: new Date(reservation.content.checkin),
            end: new Date(reservation.content.checkout),
          }))
          .filter((range) => range.start > startDate && range.end > startDate)
          .map((range) => range.start);

        return Math.min(...unavailableDates.map((date) => date.getTime()));
      })
      .reduce((min, date) => Math.min(min, date), Infinity);

    return isNaN(firstBookedOutDate) ? null : new Date(firstBookedOutDate);
  };
  // Check if a tile should be disabled
  // Check if the tile should be disabled based on various conditions
  const tileDisabled = ({ date, view }: any) => {
    if (view !== "month") return false;

    const todayDate = new Date();

    if (date < todayDate) {
      return true;
    }

    const selectable = isDateSelectable(date, selectStep === 1);

    if (selectStep === 1 && selectedRange.start) {
      const firstBookedOutDate = getFirstBookedOutDate(selectedRange.start);
      if (firstBookedOutDate && date >= firstBookedOutDate) {
        return true;
      }
    }

    return !selectable;
  };

  // Handle date click
  // Update the selected date range based on the clicked date

  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date, selectStep === 1)) {
      return;
    }

    const dateInHotelTimeZone = utcToZonedTime(date, hotelTimeZone);

    if (selectStep === 0) {
      setSelectedRange({ start: dateInHotelTimeZone, end: null });
      setSelectStep(1);
    } else {
      if (dateInHotelTimeZone < selectedRange.start) {
        setSelectedRange({ start: dateInHotelTimeZone, end: null });
      } else {
        setSelectedRange({ ...selectedRange, end: dateInHotelTimeZone });
        setSelectStep(0);
      }
    }
  };

  // Get the tile class name based on whether it's selected or not
  // Determine the appropriate class name for the tile
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
