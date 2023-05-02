import React from "react";
import { Offer } from "../../types and interfaces";
import { isDateInSeason } from "./offerHelpers";
import OfferCard from "./OfferCard";

interface OffersProps {
  availableOffers: Offer[];
  selectedRange: {
    start: Date | null;
    end: Date | null;
  };
}

const Offers: React.FC<OffersProps> = ({ availableOffers, selectedRange }) => {
  const { start, end } = selectedRange ?? {};
  const offerCards = availableOffers.map((offer) => {
    let price = 0;
    if (start && end) {
      const numDays = (end.getTime() - start.getTime()) / 86400000; // 1 day = 86400000 ms
      price = isDateInSeason(start)
        ? offer.priceSeason * numDays
        : offer.priceOffSeason * numDays;
    }
    return (
      <OfferCard
        key={offer._id}
        offer={offer}
        price={price}
        selectedRange={selectedRange}
      />
    );
  });

  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <h2 className="font-bold text-2xl mb-4 text-center">
          Available Offers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
          {offerCards}
        </div>
      </div>
    </>
  );
};

export default Offers;
