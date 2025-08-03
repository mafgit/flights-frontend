import { IFlexibilityDays } from "@/components/flight-search/FlightSearchSegment";
import { ISearchDropdownOption } from "./ISearchDropdownOption";
import { ISeatClass } from "./ISeatClass";
import { z } from "zod";

export interface ISearchFlight {
  // arrival_airport_id: number;
  arrival_airport: Partial<ISearchDropdownOption>;
  // departure_airport_id: number;
  departure_airport: Partial<ISearchDropdownOption>;
  departure_time: {
    year: number;
    month: number;
    day: number;
    flexibility_days: IFlexibilityDays;
  };
  return_time?: {
    year: number;
    month: number;
    day: number;
    flexibility_days: IFlexibilityDays;
  };
  seat_class: ISeatClass;
}

const departureSchema = z.object({
  year: z.number().int().min(2025).max(2050),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  flexibility_days: z.number().int().min(0).max(31),
});

const searchSegmentSchema = z.object({
  arrival_airport: z.object({ value: z.number().int().min(1) }),
  departure_airport: z.object({ value: z.number().int().min(1) }),
  departure_time: departureSchema,
  return_time: departureSchema.optional(),
  seat_class: z.enum(["economy", "business", "first", "premium"]),
});
// .refine(data => {
//   new Date(data.departure_time.day, data.)
// })

export const searchSegmentsSchema = z.array(searchSegmentSchema).min(1).max(6);
