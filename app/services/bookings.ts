import { IViewBookingResult } from "@/types/IViewBooking";
import { BOOKINGS_BASE_URL } from "./endpoints";

export const getOneBooking = async (id: number): Promise<IViewBookingResult> => {
  const res = await fetch(BOOKINGS_BASE_URL + "/get-one/" + id);
  const { data } = await res.json();
  return data;
};
