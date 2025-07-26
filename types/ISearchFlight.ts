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
  };
  return_time?: {
    year: number;
    month: number;
    day: number;
  };
  seat_class: IDropdownSelectedOption<ISeatClass>;
  passengers: { adults: number; children: number; infants: number };
  departure_flexibility_days: IFlexibilityDays;
  return_flexibility_days?: IFlexibilityDays;
}
