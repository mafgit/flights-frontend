import { ISeatClass } from "./ISeatClass";

export interface ISearchResult {
  id: number;
  airline_id: number;
  airline_name: string;
  arrival_airport_id: 2;
  arrival_airport_name: string;
  arrival_time: string;
  arrival_timezone: string;
  departure_airport_id: 1;
  departure_airport_name: string;
  departure_time: string;
  departure_timezone: string;
  duration: number;
  segment_total_amount: number;
  airline_logo_url: string;
  departure_city: string;
  arrival_city: string;
  seat_class: ISeatClass;
}
