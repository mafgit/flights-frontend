import { ISearchFlight } from "./ISearchFlight";
import { IRole } from "./IRole";


export interface IStoreState {
  userId?: number;
  role?: IRole;
  loading: boolean;
  hasFetched: boolean;
  fetchUser: () => Promise<void>;

  searchFlightsSegments: ISearchFlight[];
  setSearchFlightSegments: (
    searchFlightsQuery: ISearchFlight[]
  ) => Promise<any>;
}
