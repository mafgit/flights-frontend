import { IPassengersSelectedOption } from "./IPassengersSelectedOption";
import { IRole } from "./IRole";
import { ISearchDropdownOption } from "./ISearchDropdownOption";
import { ISearchFlight } from "./ISearchFlight";
import { ITripType } from "./ITripType";

export interface IAuthStoreState {
  userId?: number;
  role?: IRole;
  loading: boolean;
  hasFetched: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
  setUser: (userId: number, role: IRole) => void;
  city?: string;
  country_name?: string;
  currency?: string;
  timezone?: string;
  // search
  airportOptions: ISearchDropdownOption[];
  segments: Partial<ISearchFlight>[];
  passengers: IPassengersSelectedOption;
  type: ITripType;
  addSegment: () => void;
  removeSegment: (segmentIdx: number) => void;
  updateSegment: (segmentIdx: number, field: any, value: any) => void;
  initializeSearch: () => Promise<void>;
  initializedSearch: boolean;
  changePassengerCount: (
    change: 1 | -1 | "reset",
    type?: "adult" | "child" | "infant"
  ) => void;
  setType: (type: ITripType) => void;
  setPassengers: (passengers: IPassengersSelectedOption) => void;
  swapFromAndTo: (segmentIdx: number) => void;
  setSegments: (segments: ISearchFlight[]) => void;
}
