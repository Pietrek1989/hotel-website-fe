export interface ReservationContent {
  checkin: Date;
  checkout: Date;
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

export type WeatherNow = {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  sys: {
    type: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
};

export type WeatherData = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type WeatherHourly = {
  list: Array<WeatherData>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
};

export type WeatherListChunk = Array<WeatherData>;

export type SkiConditions = {
  items: Array<{
    operatingStatus: string;
    primarySurfaceCondition: string;

    snowLast48Hours: string;
    snowComments: string;
    avgBaseDepthMin: string;
    avgBaseDepthMax: string;
    weatherToday_Condition: string | null;
    weatherTomorrow_Condition: string | null;
    weatherDayAfterTomorrow_Condition: string | null;
    weatherDay4_Condition: string | null;
    weatherDay5_Condition: string | null;
    weatherToday_WindDirection: string | null;
    weatherTomorrow_WindDirection: string | null;
    weatherDayAfterTomorrow_WindDirection: string | null;
    weatherDay4_WindDirection: string | null;
    weatherDay5_WindDirection: string | null;
    SnoCountryResortLink: string;
  }>;
};

export interface PaymentResult {
  success: boolean;
  reservation: Reservation;
}
