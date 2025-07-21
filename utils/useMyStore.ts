import { fetchMe, logoutUser } from "@/app/services/auth";
import { create } from "zustand/react";

export type IRole = "super_admin" | "admin" | "user";

export interface IStoreState {
  userId?: number;
  role?: IRole;
  loading: boolean;
  hasFetched: boolean;
  fetchUser: () => Promise<void>;
}

const useStore = create<IStoreState>((set, get) => ({
  userId: undefined,
  role: undefined,
  loading: true,
  hasFetched: false,

  fetchUser: async () => {
    const { hasFetched } = get();
    if (!hasFetched) {
      set({ loading: true });
      const { userId, role } = await fetchMe();
      if (userId && role)
        set({
          userId,
          role,
          loading: false,
          hasFetched: true,
        });
    }
  },

  logout: async () => {
    await logoutUser()
    window.location.reload()
  },
}));

export default useStore