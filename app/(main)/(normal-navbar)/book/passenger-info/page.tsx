"use client";
import PassengerFormsSection from "@/components/booking/PassengerFormsSection";
import Separator from "@/components/misc/Separator";
import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useStepStore from "@/utils/useStepStore";
import React, { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa6";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { validatePassengerCounts } from "@/utils/validatePassengerCounts";
import { bookingPassengersSchema } from "@/types/IBookingPassenger";
import useAuthStore from "@/utils/useAuthStore";
import z from "zod";

const PassengerInfoStep = () => {
  const passengers = useStepStore((s) => s.bookingBody.passengers);
  const goToNextStep = useStepStore((s) => s.goToNextStep);
  const goToPrevStep = useStepStore((s) => s.goToPrevStep);
  const router = useRouter();

  const bookingBody = useStepStore((s) => s.bookingBody);
  const setClientSecret = useStepStore((s) => s.setClientSecret);
  const userId = useAuthStore((s) => s.userId);
  const setReceiptEmail = useStepStore((s) => s.setReceiptEmail);
  const receiptEmail = useStepStore((s) => s.receiptEmail);

  useEffect(() => {
    if (passengers.length === 0) router.back();
  }, [passengers]);

  const handleSubmit = async (e: FormEvent) => {
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

      z.email().parse(receiptEmail);

      // ------------------------------------------

      try {
        // setLoading(true);
        // console.log("BODY", bookingBody);

        console.log("sending create booking intent");

        const res = await fetch(
          "http://localhost:5000/api/bookings/create-booking-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              ...bookingBody,
              user_id: userId,
              booking_id: undefined,
              receipt_email: receiptEmail,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);

        if (goToNextStep()) {
          router.push("/book/payment-info");
        }
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookingStepsWrapper step={2}>
      <div className="max-w-[1300px] mx-auto py-12 pt-[100px]  w-max">
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
            passengers={(() => {
              const result = [];
              for (let i = 0; i < passengers.length; i++) {
                if (passengers[i].passenger_type === "adult") {
                  result.push({ ...passengers[i], i: i });
                }
              }

              return result;
            })()}
          />

          {passengers.some((p) => p.passenger_type === "child") && (
            <>
              {" "}
              <Separator horizontal />
              <PassengerFormsSection
                type="child"
                passengers={(() => {
                  const result = [];
                  for (let i = 0; i < passengers.length; i++) {
                    if (passengers[i].passenger_type === "child") {
                      result.push({ ...passengers[i], i: i });
                    }
                  }

                  return result;
                })()}
              />
            </>
          )}

          {passengers.some((p) => p.passenger_type === "infant") && (
            <>
              <Separator horizontal />

              <PassengerFormsSection
                type="infant"
                passengers={(() => {
                  const result = [];
                  for (let i = 0; i < passengers.length; i++) {
                    if (passengers[i].passenger_type === "infant") {
                      result.push({ ...passengers[i], i: i });
                    }
                  }

                  return result;
                })()}
              />
            </>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="receipt-email" className=" text-lg font-semibold">
              Receipt Email
            </label>
            <input
              className="bg-[#515151] p-2 rounded-md text-light"
              type="email"
              required
              name="receipt-email"
              id="receipt-email"
              placeholder="Enter your receipt email"
              value={receiptEmail}
              onChange={(e) => setReceiptEmail(e.target.value)}
            />
          </div>

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
