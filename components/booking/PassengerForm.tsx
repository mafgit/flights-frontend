import { IBookingPassenger } from "@/types/IBookingPassenger";
import { countries } from "@/utils/countryList";
import useStepStore from "@/utils/useStepStore";
import React, { ChangeEvent } from "react";

const PassengerForm = ({
  passenger,
  i,
}: {
  passenger: IBookingPassenger;
  i: number;
}) => {
  const setPassengers = useStepStore((s) => s.setPassengers);
  const passengers = useStepStore((s) => s.passengers);

  const updatePassengers = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.name, "=", e.target.value);

    setPassengers(
      passengers.map((p) => {
        if (p.id === passenger.id)
          return {
            ...p,
            [e.target.name]: e.target.value,
          };
        else return p;
      })
    );
  };

  return (
    <div className="bg-foreground-opposite p-5 py-8 rounded-lg mx-auto">
      <h3 className="capitalize text-lg font-semibold mb-2">
        {passenger.passenger_type} #{i + 1}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="full_name">Full Name</label>
          <input
            name="full_name"
            autoComplete="name"
            required
            placeholder="Enter full name"
            onChange={(e) => updatePassengers(e)}
            value={passenger.full_name || ""}
            className="w-[185px] bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            name="date_of_birth"
            autoComplete="bday-day"
            placeholder="Select date of birth"
            required
            onChange={(e) => updatePassengers(e)}
            value={passenger.date_of_birth || ""}
            type="date"
            className="w-[185px] bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="gender">Gender</label>
          <select
            className="w-[185px] bg-foreground text-background px-3 py-2 rounded-md"
            required
            name="gender"
            value={passenger.gender || "x"}
            onChange={(e) => updatePassengers(e)}
          >
            <option value="x">Not selected</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="passport_number">Passport number</label>
          <input
            name="passport_number"
            required
            autoComplete="off"
            placeholder="Enter passport number"
            onChange={(e) => updatePassengers(e)}
            value={passenger.passport_number || ""}
            className="w-[185px] bg-foreground text-background px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="nationality">Nationality</label>
          <select
            className="w-[185px] bg-foreground text-background px-3 py-2 rounded-md"
            name="nationality"
            required
            value={passenger.nationality || ""}
            onChange={(e) => updatePassengers(e)}
            // autoComplete="country"
          >
            <option value="">Not selected</option>

            {countries.map((c) => (
              <option key={"country-option-" + c.code} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
