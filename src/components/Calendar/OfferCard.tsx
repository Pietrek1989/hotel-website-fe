import React, { useEffect, useState } from "react";

import { Offer } from "../../types and interfaces";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedOffer, updateTotalPrice } from "../../redux/actions";
import { isDateInSeason } from "./helperFunctions/offerHelpers";
import { MdExpandMore, MdCheckCircle } from "react-icons/md";
import { motion } from "framer-motion";
import { slideInVariants } from "../../utils/motion";
import { AnimatePresence } from "framer-motion";

interface OfferCardProps {
  offer: Offer;
  price: number;
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
  index: number;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  selectedRange,
  index,
}) => {
  const [priceForNight, setPriceForNight] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const selectedOffer = useSelector(
    (state: any) => state.selectedOffer.selectedOffer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const pricePerNight = isDateInSeason(selectedRange.start!)
      ? offer.priceSeason
      : offer.priceOffSeason;
    setPriceForNight(pricePerNight);
  }, []);

  const handleOfferSelect = () => {
    const numDays =
      (selectedRange.end!.getTime() - selectedRange.start!.getTime()) /
      86400000;
    const totalPrice = priceForNight * numDays;
    dispatch(updateTotalPrice(totalPrice));
    dispatch(updateSelectedOffer(offer));
  };
  const handleeDetails = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsSelected(!isSelected);
  };
  const isCurrentOfferSelected =
    selectedOffer && selectedOffer._id === offer._id;
  const offerCardStyle = isCurrentOfferSelected
    ? "bg-white shadow-md p-4  w-full rounded-sm border-solid border-4 scale-105 cursor-pointer"
    : "bg-white shadow-md p-4  w-full rounded-sm cursor-pointer";

  return (
    <>
      <motion.div
        key={offer._id}
        variants={slideInVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
        <div className={offerCardStyle} onClick={handleOfferSelect}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">{offer.name}</h2>

            <p className="text-gray-500">
              <em>€{priceForNight.toFixed(2)}/night</em>
            </p>
          </div>
          <div className="relative">
            {" "}
            <img
              src={offer.image}
              alt={offer.name}
              className="w-full h-48 object-cover"
            />{" "}
            {isCurrentOfferSelected && (
              <span className="text-green-500 ml-2 absolute top-0 right-0 check ">
                <MdCheckCircle />
              </span>
            )}
          </div>

          <div>
            <button onClick={handleeDetails} className="flex mt-2">
              <div>
                <span>
                  {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg> */}
                  <MdExpandMore />
                </span>
              </div>
              <span>Room details</span>
            </button>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={
                isSelected ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }
              }
            >
              {isSelected &&
                offer.details?.map((desc, index) => (
                  <span key={index} className="text-gray-500 text-sm mt-2">
                    <strong>
                      {""} • {desc}
                    </strong>
                  </span>
                ))}
            </motion.div>
          </div>
        </div>
        <hr />
      </motion.div>
    </>
  );
};

export default OfferCard;
