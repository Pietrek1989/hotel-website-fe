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
  calculatePrice: (start: Date, end: Date) => number;
  selected?: boolean; // new property
}
