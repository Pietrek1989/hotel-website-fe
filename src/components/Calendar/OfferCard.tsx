import React, { useEffect, useState } from "react";

import { Offer } from "../../types and interfaces";
import { useDispatch } from "react-redux";
import { updateTotalPrice } from "../../redux/actions";
import { isDateInSeason } from "./helperFunctions/offerHelpers";

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

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 w-full "
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
    </div>
  );
};

export default OfferCard;
