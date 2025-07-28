import { ISearchResult } from "./ISearchResult";

export interface IBookingSegment extends ISearchResult {
  surcharge_amount: number;
  tax_amount: number;
  adult_base_amount: number;
  child_base_amount: number;
  infant_base_amount: number;
}
