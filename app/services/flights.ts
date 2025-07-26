import { ISearchFlight } from "@/types/ISearchFlight";
import { FLIGHTS_BASE_URL } from "./endpoints";
import { ISeatClass } from "@/types/ISeatClass";
import { ITripType } from "@/types/ITripType";
import { IFlexibilityDays } from "@/components/flight-search/FlightSearchSegment";

export const searchFlights = async (
  flights: ISearchFlight[],
  departureTimes: { min: number; max: number }[],
  airlineIds: number[],
  maxTotalDuration: number | undefined
) => {
  console.log("searchFlights", flights);
  if (flights.length === 0) throw new Error("No segments selected");

  let mappedFlights: {
    arrival_airport_id: number;
    departure_airport_id: number;
    departure_time: {
      year: number;
      month: number;
      day: number;
    };
    seat_class: ISeatClass;
    passengers: { adults: number; children: number; infants: number };
    departure_flexibility_days: IFlexibilityDays;
  }[] = flights.map((f) => ({
    // todo: validate here too?
    arrival_airport_id: f.arrival_airport.value!,
    departure_airport_id: f.departure_airport.value!,
    departure_time: f.departure_time!,
    seat_class: f.seat_class.value!,
    passengers: f.passengers!,
    arrival_time: f.return_time,
    departure_flexibility_days: f.departure_flexibility_days,
  }));

  try {
    const res = await fetch(FLIGHTS_BASE_URL + "/search", {
      method: "POST",
      body: JSON.stringify({
        flights: mappedFlights,
        departureTimes,
        airlineIds,
        maxTotalDuration: maxTotalDuration,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
