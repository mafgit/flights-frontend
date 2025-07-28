import { IRole } from "./IRole";

export interface IStoreState {
  userId?: number;
  role?: IRole;
  loading: boolean;
  hasFetched: boolean;
  fetchUser: () => Promise<void>;
  city?: string;
  country_name?: string;
  currency?: string;
  timezone?: string;
}
