import { countries } from "@/utils/countryList";
import { z } from "zod";

export interface IBookingPassenger {
  date_of_birth?: string;
  full_name?: string;
  gender: "m" | "f" | "x";
  nationality?: string;
  id: number;
  passenger_type: "adult" | "child" | "infant";
  passport_number?: string;
}

const bookingPassengerSchema = z
  .object({
    full_name: z.string().min(2).max(40),
    date_of_birth: z.string().min(8).max(10),
    gender: z.enum(["m", "f"]),
    passport_number: z.string().regex(/^[A-Z0-9]{6,10}$/),
    passenger_type: z.enum(["adult", "child", "infant"]),
    nationality: z.enum(countries.map((c) => c.name)),
  })
  .refine(
    ({ date_of_birth, passenger_type }) => {
      const dob = new Date(date_of_birth).getTime();
      if (isNaN(dob)) return false;
      const today = new Date().getTime();
      const age = Math.floor((today - dob) / (365 * 24 * 3600 * 1000));
      if (passenger_type === "adult") return age >= 12;
      if (passenger_type === "child") return age < 12 && age >= 2;
      if (passenger_type === "infant") return age >= 0 && age < 2;
      return false;
    },
    { error: "Invalid date of birth" }
  );

export const bookingPassengersSchema = z.array(bookingPassengerSchema);
