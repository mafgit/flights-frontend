import { fetchMe, logoutUser } from "@/app/services/auth";
import { create } from "zustand/react";
import { IStoreState } from "@/types/IStoreState";

const useMyStore = create<IStoreState>((set, get) => ({
  userId: undefined,
  role: undefined,
  loading: true,
  hasFetched: false,

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
        set({ loading: false });
      }
    }
  },

  logout: async () => {
    await logoutUser();
    window.location.reload();
  },
}));

export default useMyStore;
