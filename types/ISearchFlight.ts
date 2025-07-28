import { IFlexibilityDays } from "@/components/flight-search/FlightSearchSegment";
import { IDropdownSelectedOption } from "./IDropdownSelectedOption";
import { ISearchDropdownOption } from "./ISearchDropdownOption";
import { ISeatClass } from "./ISeatClass";

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
  seat_class: IDropdownSelectedOption<ISeatClass>;
}
