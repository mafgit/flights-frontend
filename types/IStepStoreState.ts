import { IBookingPassenger } from "./IBookingPassenger";
import { ISeatClass } from "./ISeatClass";

export interface IStepStoreState {
  currentFormStep: number;
  goToNextStep: () => boolean;
  goToPrevStep: () => boolean;
  bookingBody: {
    passengers: IBookingPassenger[];
    segments: { flight_id: number; seat_class: ISeatClass }[];
    total_amount: number;
  };
  // setBookingBody: ({
  //   passengers,
  //   segments,
  //   total_amount,
  // }: {
  //   passengers: IBookingPassenger[];
  //   segments: { flight_id: number; seat_class: ISeatClass }[];
  //   total_amount: number;
  // }) => void;
  setPassengers: (passengers: IBookingPassenger[]) => void;
  setSegments: (
    segments: { flight_id: number; seat_class: ISeatClass }[]
  ) => void;
  setTotalAmount: (amount: number) => void;
  clearFormSteps: () => void;
  clientSecret: string;
  setClientSecret: (secret: string) => void;
}
