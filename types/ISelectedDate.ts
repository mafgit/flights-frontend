import { IFlexibilityDays } from "@/components/flight-search/FlightSearchSegment";

export interface ISelectedDate {
  day?: number;
  month?: number;
  year?: number;
  flexibility_days: IFlexibilityDays;
}
