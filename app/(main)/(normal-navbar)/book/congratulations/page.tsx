"use client";

import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useStepStore from "@/utils/useStepStore";
import Link from "next/link";
import { useEffect } from "react";

const CongratulationsPage = () => {
  const clearFormSteps = useStepStore((s) => s.clearFormSteps);
  const bookedBookingId = useStepStore((s) => s.bookedBookingId);

  useEffect(() => {
    return () => {
      clearFormSteps();
      // todo: check
    };
  }, []);

  return (
    <BookingStepsWrapper step={4}>
      <div className="py-8 flex items-center justify-center">
        <div className="bg-foreground-opposite p-8 rounded-lg mx-auto max-w-[500px] flex items-center justify-center flex-col text-center gap-4">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Congratulations!</span> Your booking
            is confirmed!
          </h1>
          <p className="text-lg">
            Your booking id:{" "}
            <span className=" bg-blue-500 p-2 rounded-md">
              {bookedBookingId}
            </span>
          </p>
          <li className="text-lg list-disc self-start text-left">
            Details are sent to your email{" "}
            <span className=" bg-blue-500 p-2 rounded-md">abcd@abcd.com</span>
          </li>
          <li className="text-lg  list-disc self-start text-left">
            You can track your booking here using your booking id:
          </li>
          <Link
            href={"/track/" + bookedBookingId}
            className="bg-primary-shade text-lg text-foreground p-2 rounded-md w-full"
          >
            Track Booking
          </Link>
        </div>
      </div>
    </BookingStepsWrapper>
  );
};

export default CongratulationsPage;
