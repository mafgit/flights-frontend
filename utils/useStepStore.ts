import { create } from "zustand/react";
import { IStepStoreState } from "@/types/IStepStoreState";
import { IBookingPassenger } from "@/types/IBookingPassenger";

const useStepStore = create<IStepStoreState>((set, get) => ({
  currentFormStep: 1,
  formStepsCompleted: [],
  bookingBody: { passengers: [], segments: [], total_amount: 0 },

  goToNextStep: () => {
    const { formStepsCompleted, currentFormStep } = get();

    set({
      formStepsCompleted: [...formStepsCompleted, currentFormStep],
      currentFormStep: currentFormStep + 1,
    });

    return true;
  },

  goToPrevStep: () => {
    const { formStepsCompleted, currentFormStep } = get();

    if (currentFormStep === 1) return false;

    let setObject = {};

    // if (currentFormStep === 2) {
    //   setObject = { ...setObject, passengers: [] };
    // }
    set({
      ...setObject,
      formStepsCompleted: formStepsCompleted.filter(
        (s) => s !== currentFormStep - 1
      ),
      currentFormStep: currentFormStep - 1,
    });

    return true;
  },

  clearFormSteps: () => {
    set({
      bookingBody: {
        passengers: [],
        segments: [],
        total_amount: 0,
      },
      formStepsCompleted: [],
      currentFormStep: 1,
    });
  },

  bookedBookingId: undefined,
  setBookedBookingId: (id: number | undefined) => {
    set({ bookedBookingId: id });
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
}));

export default useStepStore;
