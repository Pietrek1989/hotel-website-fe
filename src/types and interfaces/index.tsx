export interface ReservationContent {
  checkin: string;
  checkout: string;
}

export interface Reservation {
  content: ReservationContent;
}
export interface OfferState {
  offers: Offer[];
}
export interface Offer {
  _id: string;
  name: string;
  priceSeason: number;
  priceOffSeason: number;
  image: string;
  reservations: Reservation[];
  details: string[];
  calculatePrice: (start: Date, end: Date) => number;
  selected?: boolean; // new property
}
export interface ReservationSave {
  _id: string;
  user: string;
  content: {
    cost: number;
    checkin: Date;
    checkout: Date;
    paid: boolean;
    canceled: boolean;
    offer: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
