import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";
import { Offer } from "../../types and interfaces";
import { utcToZonedTime } from "date-fns-tz";
import { isOfferAvailable, fetchOffers } from "./helperFunctions/offerHelpers";
import {
  isSameDate,
  isDateInRange,
  isDateSelectable,
} from "./helperFunctions/calendarHelpers";
import Offers from "./Offers";
import TotalPrice from "./TotalPrice";

import { updateTotalPrice } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { slideFromTopVariantWithOpacity } from "../../utils/motion";
import Footer from "../mainPage/Footer";

const CalendarComponent: React.FC = () => {
  const hotelTimeZone = "Europe/Berlin";
  const dispatch = useDispatch();

  const [selectedRange, setSelectedRange] = React.useState<any>(null);
  const [selectStep, setSelectStep] = React.useState(0);
  const [offers, setOffers] = React.useState<Offer[]>([]);
  const [availableOffers, setAvailableOffers] = React.useState<Offer[]>([]);

  React.useEffect(() => {
    const fetchAndSetOffers = async () => {
      const fetchedOffers: any = await fetchOffers();
      setOffers(fetchedOffers);
    };

    fetchAndSetOffers();
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
      setAvailableOffers(availableOffers);
    };
    dispatch(updateTotalPrice(0));

    updateAvailableOffers();
  }, [selectedRange, offers]);

  // const getFirstBookedOutDate = (startDate: Date) => {
  //   const firstBookedOutDate = offers
  //     .map((offer) => {
  //       const unavailableDates = offer.reservations
  //         .map((reservation) => ({
  //           start: new Date(reservation.content.checkin),
  //           end: new Date(reservation.content.checkout),
  //         }))
  //         .filter((range) => range.start > startDate && range.end > startDate)
  //         .map((range) => range.start);

  //       return Math.min(...unavailableDates.map((date) => date.getTime()));
  //     })
  //     .reduce((min, date) => Math.min(min, date), Infinity);

  //   return isNaN(firstBookedOutDate) ? null : new Date(firstBookedOutDate);
  // };
  // Check if a tile should be disabled
  // Check if the tile should be disabled based on various conditions
  const tileDisabled = ({ date, view }: any) => {
    if (view !== "month") return false;

    const todayDate = new Date();

    if (date < todayDate) {
      return true;
    }

    const selectable = isDateSelectable(
      date,
      selectStep === 1,
      selectedRange,
      offers
    );

    return !selectable;
  };

  // Handle date click
  // Update the selected date range based on the clicked date

  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date, selectStep === 1, selectedRange, offers)) {
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
    const isCheckIn = isStartDate && !isEndDate;
    const isCheckOut = isEndDate && !isStartDate;

    let className = "";

    if (isSelected) {
      className = "selected";
    }

    if (isCheckIn) {
      className += " check-in";
    }

    if (isCheckOut) {
      className += " check-out";
    }

    return className;
  };

  return (
    <div className="bg-container bg-bg py-20">
      <section className="calendar-container container md:mx-auto flex flex-wrap justify-center mb-20">
        <motion.div
          className="flex flex-col justify-center sm:basis-4/4 md:basis-3/4 "
          variants={slideFromTopVariantWithOpacity}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={tileClassName}
            tileDisabled={tileDisabled}
            className={"self-center mt-10"}
          />
          <div className="flex w-11/12 md:text-sm sm:text-xs  bg-white history-calendar-container self-center mt-0 h-20  max-w flex-wrap justify-center  md:justify-between">
            <div className="flex items-center  px-1 ">
              <div className="history-calendar bg-selected"></div>
              <span className="ml-1"> Check In</span>
            </div>
            <div className="flex items-center  px-1 ">
              <div className="history-calendar bg-lightcoral"></div>
              <span className="ml-1"> Check Out</span>
            </div>
            <div className="flex items-center px-1 ">
              <div className="history-calendar bg-lightgreen"></div>
              <span className="ml-1">Between</span>
            </div>
            <div className="flex items-center  px-1 ">
              <div className="history-calendar bg-disabled"></div>
              <span className="ml-1"> Booked Out</span>
            </div>
            <div className="flex items-center  px-1 ">
              <div className="history-calendar bg-currentDay"></div>
              <span className="ml-1"> Today</span>
            </div>
          </div>

          <div className="w-11/12 mx-auto">
            <Offers
              availableOffers={availableOffers}
              selectedRange={selectedRange}
            />
          </div>
        </motion.div>
        <motion.div
          // variants={slideFromRightVariantWithOpacity}
          // initial="hidden"
          // animate="visible"
          exit="exit"
          className="md:basis-1/4 sm:basis-3/4 w-full  h-full bg-gray-100"
        >
          <TotalPrice selectedRange={selectedRange} />
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default CalendarComponent;
