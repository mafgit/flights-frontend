"use client";
import BookingStepsWrapper from "@/utils/BookingStepsWrapper";
import useStepStore from "@/utils/useStepStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCreditCard } from "react-icons/fa6";
import PaymentForm from "@/components/booking/PaymentForm";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loading from "@/components/misc/Loading";
import useAuthStore from "@/utils/useAuthStore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentInfoStep = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const bookingBody = useStepStore((s) => s.bookingBody);
  const user_id = useAuthStore((s) => s.userId);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        setLoading(true);
        console.log("BODY", bookingBody);

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
              user_id,
              booking_id: undefined,
              receipt_email: "abc@abc.com",
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  const goToPrevStep = useStepStore((s) => s.goToPrevStep);
  const router = useRouter();

  return (
    <BookingStepsWrapper step={3}>
      <div className="max-w-[1300px] mx-auto py-12 w-max">
        {/* <div className="flex items-center justify-center gap-4">
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
        </div> */}
        {loading ? (
          <Loading />
        ) : !clientSecret ? (
          <p>Error</p>
        ) : (
          <Elements
            options={{
              clientSecret,
              appearance: {
                // theme: 'stripe',
                variables: {
                  colorPrimary: "#e99700",
                  colorBackground: "#1f1f1f",
                  colorText: "#f7f7f7",
                  colorTextSecondary: "#ffb223",
                },
              },
            }}
            stripe={stripePromise}
          >
            <PaymentForm />
          </Elements>
        )}
      </div>
    </BookingStepsWrapper>
  );
};

export default PaymentInfoStep;
