import { IBookingPassenger } from "./IBookingPassenger";

export interface IStepStoreState {
  formStepsCompleted: number[];
  currentFormStep: number;
  goToNextStep: () => boolean;
  goToPrevStep: () => boolean;
  passengers: IBookingPassenger[];
  setPassengers: (passengers: IBookingPassenger[]) => void;
  clearFormSteps: () => void;
  bookedBookingId?: number;
  setBookedBookingId: (id: number | undefined) => void;
}
