"use client";
import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useStepStore from "@/utils/useStepStore";
import React from "react";
import { useRouter } from "next/navigation";
import { FaCreditCard } from "react-icons/fa6";
import PaymentForm from "@/components/booking/PaymentForm";
import { FaArrowCircleLeft } from "react-icons/fa";

const BookingStep2 = () => {
  const goToPrevStep = useStepStore((s) => s.goToPrevStep);
  const router = useRouter();

  return (
    <BookingStepsWrapper step={3}>
      <div className="max-w-[1300px] mx-auto py-12 w-max">
        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-danger px-2 py-1 flex items-center justify-center rounded-md gap-1 mr-auto"
            onClick={() => {
              if (goToPrevStep()) {
                router.back();
              }
            }}
          >
            <FaArrowCircleLeft />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mr-auto">
            <FaCreditCard />
            <span>Payment Details</span>
          </h1>
        </div>

        <PaymentForm />
      </div>
    </BookingStepsWrapper>
  );
};

export default BookingStep2;
