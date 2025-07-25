import { ISearchFlight } from "@/types/ISearchFlight";
import { API_BASE_URL } from "./endpoints";
import { ISeatClass } from "@/types/ISeatClass";
import { ITripType } from "@/types/ITripType";

const baseUrl = API_BASE_URL + "/flights";

export const searchFlights = async (
  type: ITripType,
  flights: ISearchFlight[]
) => {
  if (flights.length === 0) throw new Error("No segments selected");

  if (type === "Round-trip") {
    if (!flights[0].return_time)
      throw new Error("No return time selected for round-trip");
    flights = [
      { ...flights[0], return_time: undefined },
      {
        ...flights[0],
        arrival_airport: flights[0].departure_airport,
        departure_airport: flights[0].arrival_airport,
        departure_time: flights[0].return_time,
      },
    ];
  }
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
    const { data } = await fetch(baseUrl + "/search", {
      method: "POST",
      body: JSON.stringify({ flights: mappedFlights }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return data ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchAirportOptions = async () => {
  const { data } = await fetch(API_BASE_URL + "/airports").then((res) =>
    res.json()
  );
  return data;
};

export const fetchSomeAirlines = async () => {
  const { data } = await fetch(API_BASE_URL + "/airlines?limit=5").then((res) =>
    res.json()
  );
  return data;
};
