import { fetchMe, logoutUser } from "@/app/services/auth";
import { create } from "zustand/react";
import { IAuthStoreState } from "@/types/IAuthStoreState";
import { getCookie } from "./cookies";
import { fetchAirportOptions } from "@/app/services/airports";
import { ITripType } from "@/types/ITripType";
import { IPassengersSelectedOption } from "@/types/IPassengersSelectedOption";
import { ISearchFlight } from "@/types/ISearchFlight";
import { IRole } from "@/types/IRole";

const useAuthStore = create<IAuthStoreState>((set, get) => ({
  userId: undefined,
  role: undefined,
  loading: false,
  hasFetched: false,
  city: undefined,
  currency: undefined,
  timezone: undefined,
  country_name: undefined,

  fetchUser: async () => {
    const { hasFetched } = get();
    if (!hasFetched) {
      try {
        set({ loading: true });
        const { userId, role } = await fetchMe();
        if (userId && role)
          set({
            userId,
            role,
            loading: false,
            hasFetched: true,
          });
      } catch (err) {
        console.log(err);
      } finally {
        const city = getCookie("city");
        const country_name = getCookie("country_name");
        const currency = getCookie("currency");
        const timezone = getCookie("timezone");

        set({
          loading: false,
          city,
          country_name,
          currency,
          timezone,
        });
      }
    }
  },

  setUser: (userId: number, role: IRole) => {
    set({
      role,
      userId,
    });
  },

  logout: async () => {
    await logoutUser();
    window.location.reload();
  },

  // search

  segments: [],

  airportOptions: [],

  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },

  initializedSearch: false,

  type: "One-way" as ITripType,

  setSegments: (segments: ISearchFlight[]) => {
    console.trace("setSegments");
    set({ segments });
  },

  initializeSearch: async () => {
    const airports = await fetchAirportOptions();
    const valueToSet = airports.map((a) => ({
      value: a.id,
      code: a.code,
      city: a.city,
      country: a.country,
    }));

    const date = new Date();

    set({
      initializedSearch: true,
      airportOptions: valueToSet,
      segments: [
        {
          departure_airport: valueToSet.find((a) => a.city === get().city),
          departure_time: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            flexibility_days: 30,
          },
          return_time: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            flexibility_days: 30,
          },
          seat_class: "any",
        },
      ],
    });
  },

  updateSegment: (segmentIdx: number, field: any, value: any) => {
    console.trace("updateSegment");

    set({
      segments: get().segments.map((segment, i) => {
        if (i === segmentIdx) {
          return {
            ...segment,
            [field]: value,
          };
        } else {
          return segment;
        }
      }),
    });
  },

  removeSegment: (segmentIdx: number) => {
    set({ segments: get().segments.filter((_, i) => i !== segmentIdx) });
  },

  addSegment: () => {
    const old = [...get().segments];
    const last = old.slice(-1)[0];

    set({
      segments: [
        ...old,
        {
          departure_airport: last.arrival_airport,
          departure_time: last.return_time ?? last.departure_time,
          seat_class: last.seat_class,
        },
      ],
    });
  },

  setType: (type: ITripType) => set({ type }),
  changePassengerCount(
    change: 1 | -1 | "reset",
    type?: "adult" | "child" | "infant"
  ) {
    if (change === "reset") {
      set({
        passengers: {
          adults: 1,
          children: 0,
          infants: 0,
        },
      });

      return;
    }

    if (type === undefined) return;

    const old: IPassengersSelectedOption = { ...get().passengers };
    let newKey: keyof IPassengersSelectedOption =
      type === "adult" ? "adults" : type === "child" ? "children" : "infants";

    set({
      passengers: {
        ...old,
        [newKey]: old[newKey] + change,
      },
    });
  },

  setPassengers: (passengers: IPassengersSelectedOption) => {
    set({
      passengers,
    });
  },

  swapFromAndTo: (segmentIdx: number) => {
    const old = [...get().segments];
    const temp = old[segmentIdx].departure_airport;

    set({
      segments: old.map((s, i) => {
        if (i === segmentIdx) {
          return {
            ...s,
            departure_airport: s.arrival_airport,
            arrival_airport: temp,
          };
        } else {
          return s;
        }
      }),
    });
  },
}));

export default useAuthStore;
