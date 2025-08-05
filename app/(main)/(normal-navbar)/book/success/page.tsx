"use client";

import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import Loading from "@/components/misc/Loading";
import Separator from "@/components/misc/Separator";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SuccessPage = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const [status, setStatus] = useState("loading");
  const formatCurrency = useCurrencyFormatter();
  const [details, setDetails] = useState<{
    booking_id: number;
    receipt_email: string;
    amount: number;
    currency: string;
  }>({ booking_id: 0, receipt_email: "", amount: 0, currency: "" });

  // const clearFormSteps = useStepStore((s) => s.clearFormSteps);
  // const bookedBookingId = useStepStore((s) => s.bookedBookingId);

  // useEffect(() => {
  //   return () => {
  //     clearFormSteps();
  //     // todo: check
  //   };
  // }, []);

  useEffect(() => {
    if (!clientSecret) {
      return setStatus("error");
    }

    if (!stripe) {
      return setStatus("loading");
    }

    setStatus("loading");
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        if (paymentIntent) {
          let booking_id = 0;

          if (paymentIntent.status === "succeeded") {
            try {
              const r = await fetch(
                "http://localhost:5000/api/payments/get-booking-data-after-success",
                {
                  credentials: "include",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    payment_intent_id: paymentIntent.id,
                  }),
                }
              );

              const data = await r.json();
              booking_id = data.booking_id;
            } catch (err) {
              console.log(err);
              setStatus("error");
              return;
            }

            setDetails({
              amount: paymentIntent.amount / 100,
              currency: paymentIntent.currency,
              receipt_email: paymentIntent.receipt_email as string,
              booking_id,
            });
          }

          setStatus(paymentIntent.status);
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }, [stripe, clientSecret]);

  return (
    <div className="py-8 flex items-center justify-center">
      <div className="p-6 bg-foreground-opposite rounded-lg flex flex-col gap-3 text-center">
        {status === "loading" ? (
          <Loading message="Fetching Details" />
        ) : status === "succeeded" ? (
          <>
            <h2 className="gap-2 font-bold flex flex-col">
              <span className="text-primary text-3xl">Success!</span>{" "}
              <span className="text-xl">Your booking is confirmed</span>
            </h2>

            <Separator horizontal />

            <div className="flex flex-col gap-2 text-lg">
              <div className="font-semibold flex justify-between items-center">
                <p>Booking ID:</p>
                <p className="text-primary">{details.booking_id}</p>
              </div>

              <div className="font-semibold flex justify-between items-center">
                <p>Receipt Email:</p>
                <p className="text-primary">{details.receipt_email}</p>
              </div>

              <div className="font-semibold flex justify-between items-center">
                <p>Total Amount:</p>
                <p className="text-primary">{formatCurrency(details.amount)}</p>
              </div>
            </div>

            <Separator horizontal />

            <div className="text-lg flex flex-col gap-3">
              <p>Booking details are sent to your email</p>
              <div className="flex flex-col gap-2">
                <p>You can view your booking here</p>
                <Link
                  href={"/view?id=" + details.booking_id}
                  className="bg-primary-shade text-lg text-foreground p-2 rounded-md w-full"
                >
                  View Booking
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <h2 className="text-2xl font-bold">
              <span className="text-danger">Failure!</span>{" "}
              <span>Your booking has failed</span>
            </h2>
            <p>Payment status: {status}</p>
          </>
        )}

        <Separator horizontal />

        <div className="">
          <p>Contact Support:</p>
          <p className="text-primary">+91 9876543210</p>
          <a href="mailto:asd@asd.asd" className="text-primary">
            asd@asd.asd
          </a>
        </div>
      </div>
    </div>
  );
};

const SuccessPageWrapper = () => {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("payment_intent_client_secret");

  return clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <SuccessPage clientSecret={clientSecret} />
    </Elements>
  ) : (
    <p>No secret</p>
  );
};

export default SuccessPageWrapper;
