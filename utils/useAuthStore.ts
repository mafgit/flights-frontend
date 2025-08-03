import { fetchMe, logoutUser } from "@/app/services/auth";
import { create } from "zustand/react";
import { IAuthStoreState } from "@/types/IAuthStoreState";
import { getCookie } from "./cookies";

const useAuthStore = create<IAuthStoreState>((set, get) => ({
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

  logout: async () => {
    await logoutUser();
    window.location.reload();
  },
}));

export default useAuthStore;
