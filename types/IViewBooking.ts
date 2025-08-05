import { ISeatClass } from "./ISeatClass";

export interface IViewSegment {
  id: number;
  booking_id: number;
  passenger_id: number;
  flight_id: number;
  seat_id: number;
  base_amount: number;
  surcharge_amount: number;
  departure_city: string;
  departure_airport_name: string;
  departure_airport_code: string;
  arrival_city: string;
  arrival_airport_name: string;
  arrival_airport_code: string;
  departure_time: string;
  arrival_time: string;
  tax_amount: number;
  total_amount: number;
  status: string;
  seat_class: ISeatClass;
  full_name: string;
  gender: "male" | "female" | "undisclosed";
  passport_number: string;
  nationality: string;
  date_of_birth: string;
  passenger_type: "adult" | "child" | "infant";
}

export interface IViewBooking {
  id: number;
  user_id: number;
  receipt_email: string;
  base_amount: number;
  surcharge_amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IViewBookingResult {
  booking: IViewBooking;
  segments: IViewSegment[];
}
