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
  const passengers = useStepStore((s) => s.bookingBody.passengers);

  const updatePassengers = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    <fieldset className="bg-foreground-opposite p-5 py-8 pt-[40px] rounded-lg mx-auto">
      <legend className="capitalize text-lg font-semibold mb-2">
        {passenger.passenger_type} #{i + 1}
      </legend>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="full_name">Full Name</label>
          <input
            id="full_name"
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
            id="date_of_birth"
            name="date_of_birth"
            autoComplete="bday"
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
            id="gender"
            className="w-[185px] bg-foreground text-background px-3 py-2 rounded-md"
            required
            name="gender"
            autoComplete="sex"
            value={passenger.gender || "undisclosed"}
            onChange={(e) => updatePassengers(e)}
          >
            <option value="undisclosed">Not selected</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="passport_number">Passport number</label>
          <input
            name="passport_number"
            required
            id="passport_number"
            autoComplete="cc-number"
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
            autoComplete="country-name"
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
    </fieldset>
  );
};

export default PassengerForm;
