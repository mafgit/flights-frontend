import { AIRPORTS_BASE_URL } from "./endpoints";

export const fetchAirportOptions = async (): Promise<
  {
    code: string;
    city: string;
    country: string;
    id: number;
  }[]
> => {
  try {
    const res = await fetch(AIRPORTS_BASE_URL, {
      credentials: "include",
    });
    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
