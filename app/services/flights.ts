import { ISearchFlight } from "@/types/ISearchFlight";
import { FLIGHTS_BASE_URL } from "./endpoints";
import { ISeatClass } from "@/types/ISeatClass";
import { IFlexibilityDays } from "@/components/flight-search/FlightSearchSegment";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import { ITripType } from "@/types/ITripType";

export const searchFlights = async (
  type: ITripType,
  flights: ISearchFlight[],
  passengers: IPassengersSelectedOption,
  departureTimes: { min: number; max: number }[],
  airlineIds: number[],
  maxTotalDuration: number | undefined
) => {
  if (flights.length === 0) throw new Error("No segments selected");

  let mappedFlights: {
    arrival_airport_id: number;
    departure_airport_id: number;
    departure_time: {
      year: number;
      month: number;
      day: number;
      flexibility_days: IFlexibilityDays;
    };
    seat_class: ISeatClass;
  }[] = flights
    .slice(0, type === "One-way" ? 1 : type === "Return" ? 2 : undefined)
    .map((f) => ({
      // todo: validate here too?
      arrival_airport_id: f.arrival_airport.value!,
      departure_airport_id: f.departure_airport.value!,
      departure_time: f.departure_time!,
      seat_class: f.seat_class,
      arrival_time: f.return_time,
    }));

  try {
    const res = await fetch(FLIGHTS_BASE_URL + "/search", {
      method: "POST",
      body: JSON.stringify({
        flights: mappedFlights,
        passengers,
        departureTimes: departureTimes.slice(0, mappedFlights.length),
        airlineIds,
        maxTotalDuration: maxTotalDuration,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
