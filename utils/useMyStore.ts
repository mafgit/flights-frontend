import { fetchMe, logoutUser } from "@/app/services/auth";
import { create } from "zustand/react";
import { IStoreState } from "@/types/IStoreState";

const useMyStore = create<IStoreState>((set, get) => ({
  userId: undefined,
  role: undefined,
  loading: true,
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
        let cookies = document.cookie;
        let country_name = "";
        let city = "";
        let currency = "";
        let timezone = "";
        cookies.split(";  ").forEach((cookie) => {
          const [name, value] = cookie.split("=");
          if (name === "city") city = value;
          else if (name === "country_name") country_name = value;
          else if (name === "currency") currency = value;
          else if (name === "timezone") timezone = value;
        });
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

  logout: async () => {
    await logoutUser();
    window.location.reload();
  },
}));

export default useMyStore;
