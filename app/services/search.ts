import { ISearchFlight } from "@/types/ISearchFlight";
import { API_BASE_URL } from "./endpoints";

const baseUrl = API_BASE_URL + "/flights";

export const searchFlights = async (flights: ISearchFlight[]) => {
  try {
    const { data } = await fetch(baseUrl + "/search", {
      method: "POST",
      body: JSON.stringify({ flights }),
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
