import { IBookingPassenger } from "@/types/IBookingPassenger";
import React from "react";
import PassengerForm from "./PassengerForm";

const PassengerFormsSection = ({
  type,
  passengers,
}: {
  type: "adult" | "child" | "infant";
  passengers: IBookingPassenger[];
}) => {
  return (
    <div className="w-max py-4 mx-auto">
      <h2 className="font-bold text-xl mb-3 text-center">
        {type === "infant"
          ? "Infants"
          : type === "child"
          ? "Children"
          : "Adults"}
      </h2>

      <div className="flex flex-wrap gap-4 justify-center items-center w-full">
        {passengers.map((p, i) => (
          <PassengerForm
            passenger={p}
            i={i}
            key={"passenger-form-" + type + "-" + i}
          />
        ))}
      </div>
    </div>
  );
};

export default PassengerFormsSection;
