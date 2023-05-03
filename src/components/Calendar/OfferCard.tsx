import React, { useEffect, useState } from "react";

import { Offer } from "../../types and interfaces";
import { useDispatch } from "react-redux";
import { updateTotalPrice } from "../../redux/actions";
import { isDateInSeason } from "./helperFunctions/offerHelpers";
import { MdExpandMore } from "react-icons/md";
import { motion } from "framer-motion";

interface OfferCardProps {
  offer: Offer;
  price: number;
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, selectedRange }) => {
  const [priceForNight, setPriceForNight] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

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
  };
  const handleeDetails = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsSelected(!isSelected);
  };

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 w-full  my-5"
      onClick={handleOfferSelect}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">{offer.name}</h2>

        <p className="text-gray-500">€{priceForNight.toFixed(2)}/night</p>
      </div>

      <img
        src={offer.image}
        alt={offer.name}
        className="w-full h-48 object-cover"
      />

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
          animate={{ opacity: 1, y: 0 }}
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
  );
};

export default OfferCard;
