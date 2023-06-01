import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { saveReservation } from "./helperFunctions/reservationHelpers";
import StripeCheckout from "react-stripe-checkout";
import React, { useState, useEffect } from "react";
import { updatePaymentResult, updateSelectedOffer } from "../../redux/actions";
import PaymentResult from "./PaymentResult";
import { slideFromRightVariantWithOpacity } from "../../utils/motion";

interface OffersProps {
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
}
const TotalPrice: React.FC<OffersProps> = ({ selectedRange }) => {
  const initialOfferState = {
    _id: "",
    name: "",
    priceSeason: 0,
    priceOffSeason: 0,
    image: "",
    reservations: [],
    details: [],
    calculatePrice: () => 0,
    selected: false,
  };
  const dispatch = useDispatch();

  const totalPrice = useSelector((state: any) => state.totalPrice.totalPrice);
  const selectedOffer = useSelector(
    (state: any) => state.selectedOffer.selectedOffer
  );

  useEffect(() => {
    dispatch(updateSelectedOffer(initialOfferState));
    dispatch(updatePaymentResult(""));
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleReservation = (token: any) => {
    if (selectedRange.start && selectedRange.end) {
      saveReservation(
        totalPrice,
        selectedRange.start,
        selectedRange.end,
        selectedOffer._id,
        dispatch,
        token
      );
    }
  };

  return (
    <motion.div
      variants={slideFromRightVariantWithOpacity}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-md rounded-md p-4 mt-4 price-container flex flex-col sm:text-lg md:text-sm lg:text-lg totalPrice-container"
    >
      <p className="font-bold text-lg text-cennter mb-5">
        Booking information:
      </p>
      {selectedRange && (
        <div className="text-charcoal">
          <p>Check In: {selectedRange.start?.toDateString()}</p>
          <p>
            <em>After 15:00</em>
          </p>
          <br />
          <p>Check Out: {selectedRange.end?.toDateString()}</p>
          <p>
            <em>Before 12:00</em>
          </p>
          <br />
        </div>
      )}
      <p className=" mb-2 text-gray-500">Selected: {selectedOffer?.name}</p>
      {selectedOffer?.image && (
        <img
          src={selectedOffer?.image}
          alt={selectedOffer?.name}
          className=" w-24 mx-auto"
        />
      )}
      <br />
      <p className="text-gray-500">Price including taxes:</p>
      <hr className="bg-black mb-2" />€{totalPrice}
      <br />
      <div className="text-center">
        {localStorage.getItem("accessToken") ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-selected p-2 rounded-md text-white hover:bg-green mb-5"
            onClick={handleOpenModal}
            disabled={totalPrice === 0}
          >
            Reserve
          </motion.button>
        ) : (
          <p>Plese Log In to book</p>
        )}
      </div>
      <div className="mx-auto">
        <img
          src={require("../../assets/8eeead46-0f0b-41be-8244-10fe9feeb56e.png")}
          alt="logo"
          className=" w-40 md:w-20"
        />
      </div>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${
            isModalOpen ? "" : "hidden"
          }`}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mt-10 confirmation-window">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AiOutlineCheckCircle
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Confirm Booking
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to book this room?
                      </p>
                      <p>CHARGE: {totalPrice}€</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseModal}
                  className="mx-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-3 py-1 bg-gray-300 text-base font-medium text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <StripeCheckout
                    amount={totalPrice * 100}
                    token={handleReservation}
                    currency="EUR"
                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!}
                  />{" "}
                </motion.button>
              </div>
              <PaymentResult />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TotalPrice;
