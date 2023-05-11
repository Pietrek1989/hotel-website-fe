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
    ? "flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700border-solid border-4 scale-105  cursor-pointer my-5"
    : "flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer";

  return (
    <>
      <motion.div
        key={offer._id}
        variants={slideInVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
<div className={offerCardStyle}  onClick={handleOfferSelect}>
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"               src={offer.image}
              alt={offer.name} />
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{offer.name}</h5>
        <p className="text-gray-500">
              <em>€{priceForNight.toFixed(2)}/night</em>
            </p>
        <button onClick={handleeDetails} className="flex mt-2">
              <div>
                <span>
                  <MdExpandMore />
                </span>
              </div>
              <span>Room details</span>
            </button>

    </div>
    {isCurrentOfferSelected && (
              <span className="text-green-500 ml-2 absolute top-0 right-0 check ">
                <MdCheckCircle />
              </span>
            )}

</div>
<div className={offerCardStyle}>
  <div>
    {isSelected &&
                offer.details?.map((desc, index) => (
                  <p className=" text-gray-500 p-2 dark:text-gray-400">
                  {""} • {desc}
                </p>
                                ))}
                                </div>
                                </div>

      </motion.div>
    </>
  );
};

export default OfferCard;
