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
  user: {
    name: string;
    surname: string;
    email: string;
  };
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
export interface ImageState {
  gallery: string[];
  hero: string[];
}

export interface FormValues {
  email: string;
  password: string;
}

export interface User {
	_id: string;
	name: string;
  surname: string;
	email: string;

}

export interface FormValuesRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
}