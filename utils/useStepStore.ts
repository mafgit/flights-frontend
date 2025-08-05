import { create } from "zustand/react";
import { IStepStoreState } from "@/types/IStepStoreState";

const useStepStore = create<IStepStoreState>((set, get) => ({
  currentFormStep: 1,
  bookingBody: { passengers: [], segments: [], total_amount: 0 },

  goToNextStep: () => {
    set({ currentFormStep: get().currentFormStep + 1 });
    return true;
  },

  goToPrevStep: () => {
    set({ currentFormStep: get().currentFormStep + 1 });
    return true;
  },

  clearFormSteps: () => {
    set({
      bookingBody: {
        passengers: [],
        segments: [],
        total_amount: 0,
      },
      currentFormStep: 1,
    });
  },

  setPassengers: (passengers) => {
    set({
      bookingBody: {
        ...get().bookingBody,
        passengers,
      },
    });
  },

  setTotalAmount: (total_amount) => {
    set({
      bookingBody: {
        ...get().bookingBody,
        total_amount,
      },
    });
  },

  setSegments: (segments) => {
    set({
      bookingBody: {
        ...get().bookingBody,
        segments,
      },
    });
  },

  clientSecret: "",
  setClientSecret: (secret) => set({ clientSecret: secret }),
}));

export default useStepStore;
