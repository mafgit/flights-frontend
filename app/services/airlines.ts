import { AIRLINES_BASE_URL } from "./endpoints";

export const fetchSomeAirlines = async (limit = 0) => {
  try {
    const res = await fetch(
      AIRLINES_BASE_URL + (limit <= 0 ? "" : `?limit=${limit}`)
    );
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
