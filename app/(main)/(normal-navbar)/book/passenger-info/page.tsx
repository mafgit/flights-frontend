"use client";
import PassengerFormsSection from "@/components/booking/PassengerFormsSection";
import Separator from "@/components/misc/Separator";
import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useStepStore from "@/utils/useStepStore";
import React, { FormEvent, MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUsers } from "react-icons/fa6";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { validatePassengerCounts } from "@/utils/validatePassengerCounts";
import { bookingPassengersSchema } from "@/types/IBookingPassenger";

const PassengerInfoStep = () => {
  const passengers = useStepStore((s) => s.bookingBody.passengers);
  const goToNextStep = useStepStore((s) => s.goToNextStep);
  const goToPrevStep = useStepStore((s) => s.goToPrevStep);
  const router = useRouter();

  useEffect(() => {
    if (passengers.length === 0) router.back();
  }, [passengers]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      let infants = 0,
        children = 0,
        adults = 0;

      passengers.forEach((p) => {
        if (p.passenger_type === "infant") infants++;
        else if (p.passenger_type === "child") children++;
        else if (p.passenger_type === "adult") adults++;
      });

      let totalPassengers = adults + children + infants;

      // --------------- validation --------------

      if (!validatePassengerCounts(adults, children, infants))
        throw new Error("Invalid number of passengers");

      bookingPassengersSchema
        .min(totalPassengers)
        .max(totalPassengers)
        .parse(passengers);

      // ------------------------------------------

      if (goToNextStep()) {
        router.push("/book/payment-info");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookingStepsWrapper step={2}>
      <div className="max-w-[1300px] mx-auto py-12 w-max">
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className="bg-danger px-2 py-1 flex items-center justify-center rounded-md gap-1"
            onClick={() => {
              if (goToPrevStep()) router.back();
            }}
          >
            <FaArrowCircleLeft />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold flex items-center justify-center gap-4">
            <FaUsers />
            <span>Passenger Details</span>
          </h1>
        </div>
        <form
          autoComplete="on"
          className="flex flex-col mt-4"
          onSubmit={handleSubmit}
        >
          <PassengerFormsSection
            type="adult"
            passengers={passengers.filter((p) => p.passenger_type === "adult")}
          />

          {passengers.some((p) => p.passenger_type === "child") && (
            <>
              {" "}
              <Separator horizontal />
              <PassengerFormsSection
                type="child"
                passengers={passengers.filter(
                  (p) => p.passenger_type === "child"
                )}
              />
            </>
          )}

          {passengers.some((p) => p.passenger_type === "infant") && (
            <>
              <Separator horizontal />

              <PassengerFormsSection
                type="infant"
                passengers={passengers.filter(
                  (p) => p.passenger_type === "infant"
                )}
              />
            </>
          )}

          <button
            type="submit"
            className="w-full mt-8 relative group bg-primary-shade text-white rounded-md flex items-center justify-center gap-2 text-lg p-2 px-3 font-semibold"
          >
            <div className="absolute w-0 h-full z-[5] rounded-md top-0 left-0 bg-foreground transition-all duration-200 group-hover:w-full"></div>
            <FaArrowCircleRight className="z-[10] group-hover:text-primary-shade transition-all duration-200" />
            <span className="z-[10] text-xl group-hover:text-primary-shade transition-all duration-200">
              Proceed to Payment Details
            </span>
          </button>
        </form>
      </div>
    </BookingStepsWrapper>
  );
};

export default PassengerInfoStep;
