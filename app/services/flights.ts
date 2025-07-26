import { ISearchFlight } from "@/types/ISearchFlight";
import { FLIGHTS_BASE_URL } from "./endpoints";
import { ISeatClass } from "@/types/ISeatClass";
import { ITripType } from "@/types/ITripType";

export const searchFlights = async (
  type: ITripType,
  flights: ISearchFlight[],
  // totalDuration: number | undefined,
  departureTimes: { min: number; max: number }[],
  airlineIds: number[]
) => {
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
  }[] = flights.map((f) => ({
    // todo: validate here too?
    arrival_airport_id: f.arrival_airport.value!,
    departure_airport_id: f.departure_airport.value!,
    departure_time: f.departure_time!,
    seat_class: f.seat_class.value!,
    passengers: f.passengers!,
    arrival_time: f.return_time,
  }));

  if (type === "Round-trip") {
    mappedFlights = mappedFlights;
  }
  try {
    const res = await fetch(FLIGHTS_BASE_URL + "/search", {
      method: "POST",
      body: JSON.stringify({
        flights: mappedFlights,
        // totalDuration: totalDuration,
        departureTimes,
        airlineIds,
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
