import { create } from "zustand/react";
import { IStepStoreState } from "@/types/IStepStoreState";
import { IBookingPassenger } from "@/types/IBookingPassenger";

const useStepStore = create<IStepStoreState>((set, get) => ({
  currentFormStep: 1,
  formStepsCompleted: [],
  passengers: [],
  setPassengers: (passengers: IBookingPassenger[]) => set({ passengers }),
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

    if (currentFormStep === 2) {
      setObject = { ...setObject, passengers: [] };
    }
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
      passengers: [],
      formStepsCompleted: [],
      currentFormStep: 1,
    });
  },

  bookedBookingId: undefined,
  setBookedBookingId: (id: number | undefined) => {
    set({ bookedBookingId: id });
  },
}));

export default useStepStore;
