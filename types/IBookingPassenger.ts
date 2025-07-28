export interface IBookingPassenger {
  date_of_birth?: string;
  full_name?: string;
  gender: "m" | "f" | "x";
  nationality?: string;
  id: number;
  passenger_type: "adult" | "child" | "infant";
  passport_number?: string;
}
