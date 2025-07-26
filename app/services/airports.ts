import { AIRPORTS_BASE_URL } from "./endpoints";

export const fetchAirportOptions = async () => {
  try {
    const res = await fetch(AIRPORTS_BASE_URL);
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
