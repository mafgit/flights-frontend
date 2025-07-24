import { ISeatClass } from "./ISeatClass";


export interface ISearchFlight {
  arrival_airport_id: number;
  departure_airport_id: number;
  departure_time: {
    year: number;
    month: number;
    day: number;
  };
  seat_class: ISeatClass;
  passengers: { adults: number; children: number; infants: number; };
}
