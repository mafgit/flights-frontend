import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import { CARTS_BASE_URL } from "./endpoints";
import { ISeatClass } from "@/types/ISeatClass";

export const addCart = async (
  flights: { flightId: number; seatClass: ISeatClass }[],
  passengers: IPassengersSelectedOption
) => {
  const res = await fetch(CARTS_BASE_URL + "/add", {
    method: "POST",
    body: JSON.stringify({ flights, passengers }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();

  return data;
};

export const getCart = async () => {
  const res = await fetch(CARTS_BASE_URL + "/get-one", {
    credentials: "include",
  });

  const { data } = await res.json();

  return data;
};
